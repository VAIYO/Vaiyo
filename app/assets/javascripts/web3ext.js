// const vaiyotokenaddress = "0xBA19f24dFCf7f795D90c0404d104680dB28BAC2b"; //main
const vaiyotokenaddress = "0x028C98fB13F551FaF5EfF0Dec5c80B98CFf706A5"; //test
const lockvaiyoaddress = "0x8be3b8dDe84FEF79B9b72A41b15CCa89A7933Ad2";
// const web3 = new Web3(
//   new Web3.providers.HttpProvider()
//   //"https://mainnet.infura.io/v3/515bc6d0df73416e938446fd12ae9234"
//   //"https://bsc-dataseed.binance.org"
// );
var web3 = new Web3(window.ethereum);
const LockContractABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Recovered",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "add", type: "address" }],
    name: "checkTime",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "deposits",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "deposittimes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "bnbAmount", type: "uint256" }],
    name: "getBUSDAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBUSDPerBNB",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "usdAmount", type: "uint256" }],
    name: "getTokensAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minDepositAmount",
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
  {
    inputs: [],
    name: "priceFeed",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "add", type: "address" }],
    name: "read",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bool", name: "", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "tokenAmount", type: "uint256" },
    ],
    name: "recoverBEP20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "releaseFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "releaseFundsAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      { internalType: "contract VaiyoToken", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBNB",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totallockTime",
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
];

getBalance = async function (account) {
  var balance = 0;
  if (web3 !== "undefined") {
    await web3.eth.getBalance(account, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        balance = web3.utils.fromWei(result, "ether");
      }
    });
  }
  return balance;
};

function onbtnMax() {
  const user = $("#mycontainer").data("source");
  const balance = getBalance(user.waddress);
  getBalance(user.waddress).then((e) => {
    document.getElementById("amountinput").value = e - 0.01;
  });
}

async function depositBNB() {
  const user = $("#mycontainer").data("source");
  const depositAmount = document.getElementById("amountinput").value;
  const amount = new BigNumber(depositAmount + "e18");
  console.log("Deposit Amount: ", amount.toString());
  console.log("Account: ", user.waddress);
  const LockContract = new web3.eth.Contract(LockContractABI, lockvaiyoaddress);
  LockContract.methods
    .deposit()
    .send({
      from: user.waddress,
      value: amount, // in WEI, which is equivalent to 1 ether
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
