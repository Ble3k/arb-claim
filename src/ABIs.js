export const arbDistributorABI = [
  {
    inputs: [
      { internalType: "contract IERC20VotesUpgradeable", name: "_token", type: "address" },
      { internalType: "address payable", name: "_sweepReceiver", type: "address" },
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "uint256", name: "_claimPeriodStart", type: "uint256" },
      { internalType: "uint256", name: "_claimPeriodEnd", type: "uint256" },
      { internalType: "address", name: "delegateTo", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, internalType: "address", name: "recipient", type: "address" },
      { indexed: !1, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "CanClaim",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, internalType: "address", name: "recipient", type: "address" },
      { indexed: !1, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "HasClaimed",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: !0, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [{ indexed: !0, internalType: "address", name: "newSweepReceiver", type: "address" }],
    name: "SweepReceiverSet",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [{ indexed: !1, internalType: "uint256", name: "amount", type: "uint256" }],
    name: "Swept",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, internalType: "address", name: "recipient", type: "address" },
      { indexed: !1, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "Withdrawal",
    type: "event",
  },
  { inputs: [], name: "claim", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "delegatee", type: "address" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "claimAndDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimPeriodEnd",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimPeriodStart",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "claimableTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "address[]", name: "_recipients", type: "address[]" },
      { internalType: "uint256[]", name: "_claimableAmount", type: "uint256[]" },
    ],
    name: "setRecipients",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address payable", name: "_sweepReceiver", type: "address" }],
    name: "setSweepReciever",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "sweep", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "sweepReceiver",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20VotesUpgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimable",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const erc20ABI = [
  {
    constant: !0,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !1,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: !1,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !1,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: !1,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: !1,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: !1,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: !0,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function",
  },
  { payable: !0, stateMutability: "payable", type: "fallback" },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "owner", type: "address" },
      { indexed: !0, name: "spender", type: "address" },
      { indexed: !1, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "from", type: "address" },
      { indexed: !0, name: "to", type: "address" },
      { indexed: !1, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
];
export const arbMulticallABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "bytes", name: "callData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate",
    outputs: [
      { internalType: "uint256", name: "blockNumber", type: "uint256" },
      { internalType: "bytes[]", name: "returnData", type: "bytes[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "bytes", name: "callData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "blockAndAggregate",
    outputs: [
      { internalType: "uint256", name: "blockNumber", type: "uint256" },
      { internalType: "bytes32", name: "blockHash", type: "bytes32" },
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "returnData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "blockNumber", type: "uint256" }],
    name: "getBlockHash",
    outputs: [{ internalType: "bytes32", name: "blockHash", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlockNumber",
    outputs: [{ internalType: "uint256", name: "blockNumber", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [{ internalType: "address", name: "coinbase", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [{ internalType: "uint256", name: "difficulty", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [{ internalType: "uint256", name: "gaslimit", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [{ internalType: "uint256", name: "timestamp", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "addr", type: "address" }],
    name: "getEthBalance",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getL1BlockNumber",
    outputs: [{ internalType: "uint256", name: "l1BlockNumber", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastBlockHash",
    outputs: [{ internalType: "bytes32", name: "blockHash", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bool", name: "requireSuccess", type: "bool" },
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "bytes", name: "callData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "returnData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bool", name: "requireSuccess", type: "bool" },
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "bytes", name: "callData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryBlockAndAggregate",
    outputs: [
      { internalType: "uint256", name: "blockNumber", type: "uint256" },
      { internalType: "bytes32", name: "blockHash", type: "bytes32" },
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "returnData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
