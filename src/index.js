import { ethers } from "ethers";

import { RPC_API_KEY, ACCOUNT_PRIVATE_KEY } from "./init.js";
import {
  WAIT_PER_REQUEST_TIME,
  BALANCE_CHECK_REPEAT_TIME,
  SEND_TO,
  ARB_MULTICALL_ADDRESS,
  ARB_TOKEN_ADDRESS,
  ARB_TOKEN_DISTRIBUTOR_ADDRESS,
  ARB_TOKEN_DECIMALS,
  CLAIM_START_ON_BLOCK,
  ARB_WS_URL,
} from "./config.js";

import { arbDistributorABI, erc20ABI, arbMulticallABI } from "./ABIs.js";
import { doRequestSafeRepeat } from "./utils/fetcher.js";
import wait from "./utils/wait.js";

const arbitrumProvider = new ethers.providers.WebSocketProvider(`${ARB_WS_URL}${RPC_API_KEY}`, "arbitrum");
const arbMulticall = new ethers.Contract(ARB_MULTICALL_ADDRESS, arbMulticallABI, arbitrumProvider);
const arbDistributor = new ethers.Contract(ARB_TOKEN_DISTRIBUTOR_ADDRESS, arbDistributorABI, arbitrumProvider);
const arbToken = new ethers.Contract(ARB_TOKEN_ADDRESS, erc20ABI, arbitrumProvider);
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, arbitrumProvider);

const claim = async (nonce) => {
  const claimTx = await doRequestSafeRepeat({
    request: async () =>
      await arbDistributor.connect(wallet).claim({
        gasLimit: "0x4C4B40",
        gasPrice: "0x3B9ACA00",
        nonce,
      }),
    onFailedMessaged: "Failed to call claim method!",
    waitTimeMS: WAIT_PER_REQUEST_TIME,
  });

  inspect(`Claim was called successful! Tx hash: ${claimTx.hash}`);
};

const transferARB = async (nonce) => {
  for (let i = 0; i < SEND_TO.length; i++) {
    const { name, address, amount } = SEND_TO[i];

    const amountBN = ethers.utils.parseUnits(amount, ARB_TOKEN_DECIMALS);
    const transferTx = await doRequestSafeRepeat({
      request: async () =>
        await arbToken.connect(wallet).transfer(address, amountBN, {
          gasLimit: "0x4C4B40", // 5kk WEI
          gasPrice: "0x3B9ACA00", // 1kkk WEI
          nonce: nonce + i,
        }),
      onFailedMessaged: "Failed to call transfer method!",
      waitTimeMS: WAIT_PER_REQUEST_TIME,
    });

    inspect(`Transfer to ${address} (${name}) was called successful! Tx hash: ${transferTx.hash}`);
  }
};

const waitForTargetBlock = async () => {
  let ethBlockNumber;

  do {
    try {
      const data = await arbMulticall.getL1BlockNumber();
      ethBlockNumber = data.toNumber();
      inspect(ethBlockNumber);
    } catch (e) {
      inspect("Failed to get L1 block number!");
      inspect(e);
    }
  } while (ethBlockNumber < CLAIM_START_ON_BLOCK);

  inspect(`Claim started! ETH block number inside Arbitrum is: #${ethBlockNumber}`);
};

const waitForARBOnWallet = async () => {
  inspect(`Balance check for wallet ${wallet.address} started!`);
  let balance;

  do {
    await wait(BALANCE_CHECK_REPEAT_TIME);

    try {
      const data = await arbToken.balanceOf(wallet.address);
      balance = +ethers.utils.formatUnits(data, ARB_TOKEN_DECIMALS);
      inspect(`Current balance for wallet ${wallet.address} - ${balance} ARB`);
    } catch (e) {
      inspect(`Failed to get ARB balance of wallet ${wallet.address}`);
      inspect(e);
    }
  } while (balance === 0);
};

const start = async () => {
  const currentNonce = await doRequestSafeRepeat({
    request: async () => await wallet.getTransactionCount(),
    onFailedMessaged: "Failed to get transaction count!",
    waitTimeMS: WAIT_PER_REQUEST_TIME,
  });

  await waitForTargetBlock();
  await claim(currentNonce);
  await waitForARBOnWallet();
  await transferARB(currentNonce + 1);
};

start();
