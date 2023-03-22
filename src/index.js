import { bootstrap } from "global-agent";
import { ethers } from "ethers";

import { RPC_API_KEY, ACCOUNT_PRIVATE_KEY, GLOBAL_AGENT_HTTP_PROXY } from "./init.js";
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

// for debug purposes
if (GLOBAL_AGENT_HTTP_PROXY) {
  bootstrap();
}

const arbitrumProvider = new ethers.providers.WebSocketProvider(`${ARB_WS_URL}${RPC_API_KEY}`, "arbitrum");
const arbMulticall = new ethers.Contract(ARB_MULTICALL_ADDRESS, arbMulticallABI, arbitrumProvider);
const arbDistributor = new ethers.Contract(ARB_TOKEN_DISTRIBUTOR_ADDRESS, arbDistributorABI, arbitrumProvider);
const arbToken = new ethers.Contract(ARB_TOKEN_ADDRESS, erc20ABI, arbitrumProvider);
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, arbitrumProvider);

const claim = async (nonce) => {
  // CAN BE CHANGED! Do not forget to check this
  // const claimTx = await doRequestSafeRepeat({
  //   request: async () =>
  //     await arbDistributor.connect(wallet).claim({
  //       gasLimit: "0x4C4B40",
  //       gasPrice: "0x3B9ACA00",
  //       nonce,
  //     }),
  //   onFailedMessaged: "Failed to call claim method!",
  //   waitTimeMS: WAIT_PER_REQUEST_TIME,
  // });
  const claimTx = { hash: "0x123" };

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
          nonce: nonce + i, // CAN BE CHANGED! Do not forget to check this
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
  let balance;
  let c = 0; // CAN BE CHANGED! Do not forget to check this

  do {
    await wait(BALANCE_CHECK_REPEAT_TIME);

    try {
      c++; // CAN BE CHANGED! Do not forget to check this
      const data = await arbToken.balanceOf(wallet.address);
      balance = c < 5 ? 0 : +ethers.utils.formatUnits(data, ARB_TOKEN_DECIMALS); // CAN BE CHANGED! Do not forget to check this
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
  // await transferARB(currentNonce + 1);
  await transferARB(currentNonce); // CAN BE CHANGED! Do not forget to check this
};

start();
