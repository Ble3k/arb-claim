import { ethers } from "ethers";

import { RPC_API_KEY, ACCOUNT_PRIVATE_KEY } from "./init.js";
import {
  LOCAL_PING_INTERVAL,
  WAIT_PER_REQUEST_TIME,
  BALANCE_CHECK_REPEAT_TIME,
  SEND_TO,
  ARB_MULTICALL_ADDRESS,
  ARB_TOKEN_ADDRESS,
  ARB_TOKEN_DISTRIBUTOR_ADDRESS,
  ARB_TOKEN_DECIMALS,
  CLAIM_START_ON_BLOCK,
  ARB_WS_URL,
  ETH_WS_URL,
} from "./config.js";

import { arbDistributorABI, erc20ABI, arbMulticallABI } from "./ABIs.js";
import { doRequestSafeRepeat } from "./utils/fetcher.js";
import wait from "./utils/wait.js";

const ethProvider = new ethers.providers.WebSocketProvider(`${ETH_WS_URL}${RPC_API_KEY}`, "homestead");
const arbitrumProvider = new ethers.providers.WebSocketProvider(`${ARB_WS_URL}${RPC_API_KEY}`, "arbitrum");
const arbMulticall = new ethers.Contract(ARB_MULTICALL_ADDRESS, arbMulticallABI, arbitrumProvider);
const arbDistributor = new ethers.Contract(ARB_TOKEN_DISTRIBUTOR_ADDRESS, arbDistributorABI, arbitrumProvider);
const arbToken = new ethers.Contract(ARB_TOKEN_ADDRESS, erc20ABI, arbitrumProvider);
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, arbitrumProvider);

let blockNumberProcessing = null;

ethProvider.on("block", async (blockNumber) => {
  console.log(blockNumber, "-----Ethereum------");
  // if (blockNumberProcessing !== blockNumber) {
  //   inspect(`Processing block: #${blockNumber}`);
  //   blockNumberProcessing = blockNumber;
  //
  //   if (blockNumber === +CLAIM_START_ON_BLOCK) {
  //     const currentNonce = await doRequestSafeRepeat({
  //       request: async () => await wallet.getTransactionCount(),
  //       onFailedMessaged: `Failed to get transaction count on block #${blockNumber}`,
  //       waitTimeMS: WAIT_PER_REQUEST_TIME,
  //     });
  //     const claimTx = await doRequestSafeRepeat({
  //       request: async () =>
  //         await arbDistributor.connect(wallet).claim({
  //           gasLimit: "0x4C4B40",
  //           gasPrice: "0x3B9ACA00",
  //           nonce: currentNonce,
  //         }),
  //       onFailedMessaged: `Failed to call claim method on block #${blockNumber}`,
  //       waitTimeMS: WAIT_PER_REQUEST_TIME,
  //     });
  //
  //     inspect(`Claim was called successful! Tx hash: ${claimTx.hash}`);
  //
  //     let balance;
  //     let balanceFormatted;
  //     do {
  //       await wait(BALANCE_CHECK_REPEAT_TIME);
  //
  //       try {
  //         balance = await arbToken.balanceOf(wallet.address);
  //         balanceFormatted = +ethers.utils.formatUnits(balance, ARB_TOKEN_DECIMALS);
  //         inspect(`Current balance for wallet ${wallet.address} - ${balanceFormatted} ARB`);
  //       } catch (e) {
  //         inspect(`Failed to get ARB balance of wallet ${wallet.address} on block ${blockNumber}`);
  //         inspect(e);
  //       }
  //     } while (balanceFormatted === 0);
  //
  //     for (let i = 0; i < SEND_TO.length; i++) {
  //       const { name, address, amount } = SEND_TO[i];
  //
  //       const amountBN = ethers.utils.parseUnits(amount, ARB_TOKEN_DECIMALS);
  //       const transferTx = await doRequestSafeRepeat({
  //         request: async () =>
  //           await arbToken.connect(wallet).transfer(address, amountBN, {
  //             gasLimit: "0x4C4B40",
  //             gasPrice: "0x3B9ACA00",
  //             nonce: currentNonce + 1 + i,
  //           }),
  //         onFailedMessaged: `Failed to call transfer method on block #${blockNumber}`,
  //         waitTimeMS: WAIT_PER_REQUEST_TIME,
  //       });
  //       inspect(`Transfer to ${address} (${name}) was called successful! Tx hash: ${transferTx.hash}`);
  //     }
  //   }
  // }
});

arbitrumProvider.on("block", async (blockNumber) => {
  console.log(blockNumber, "Arbitrum");

  if (!(blockNumber % 10)) {
    const ethBlockNumber = await arbMulticall.getL1BlockNumber();
    console.log(ethBlockNumber.toNumber(), "-----inside Arbitrum ethereum blocknumber, check every 5 sec------");
  }
});
