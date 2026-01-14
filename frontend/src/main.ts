// External dependencies
import { modal } from "./Wallet.ts";
import { BrowserProvider, parseEther, ethers } from "ethers";
import { contractAddress } from "./address/addressConfig.ts";
//import { withUI } from "./global-Ux/loading-ui.ts";

// ==============================
// MODULE STATE
// ==============================

const ARTIFACT_PATH = "artifact/counter.json";

// ==============================
// ABI & CONTRACT HELPERS
// ==============================

export async function loadABI(path : string) {
  const res = await fetch(path);
  const text = await res.text();
  console.log('ABI raw response:', text.slice(0, 200));

  return JSON.parse(text);
}


async function getContract(signer : ethers.Signer) {
  const artifact = {
  "_format": "hh-sol-artifact-1",
  "contractName": "counter",
  "sourceName": "contracts/Counter.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_initialValue",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "changeOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decracement",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "increment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetValue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "value",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608034607a57601f61027938819003918201601f19168301916001600160401b03831184841017607f578084926040948552833981010312607a5780516020909101516001600160a01b0381169190829003607a57600055600180546001600160a01b0319169190911790556040516101e390816100968239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe608080604052600436101561001357600080fd5b60003560e01c90816316e9fe81146101965781633fa4f2451461017b575080637147b5b6146101585780638da5cb5b1461012f578063a6f9dae1146100a15763d09de08a1461006157600080fd5b3461009c57600036600319011261009c57600054600019811461008657600101600055005b634e487b7160e01b600052601160045260246000fd5b600080fd5b3461009c57602036600319011261009c576004356001600160a01b0381169081900361009c576001546001600160a01b03811633036100ea576001600160a01b03191617600155005b60405162461bcd60e51b815260206004820152601b60248201527f4f6e6c79206f776e65722063616e206368616e6765206f776e657200000000006044820152606490fd5b3461009c57600036600319011261009c576001546040516001600160a01b039091168152602090f35b3461009c57600036600319011261009c5760005480156100865760001901600055005b3461009c57600036600319011261009c576020906000548152f35b3461009c57600036600319011261009c576000805500fea2646970667358221220475d224d82e1d38473d6a1efcf35ecdad32498491f770187013dfa1696342e5b64736f6c634300081c0033",
  "deployedBytecode": "0x608080604052600436101561001357600080fd5b60003560e01c90816316e9fe81146101965781633fa4f2451461017b575080637147b5b6146101585780638da5cb5b1461012f578063a6f9dae1146100a15763d09de08a1461006157600080fd5b3461009c57600036600319011261009c57600054600019811461008657600101600055005b634e487b7160e01b600052601160045260246000fd5b600080fd5b3461009c57602036600319011261009c576004356001600160a01b0381169081900361009c576001546001600160a01b03811633036100ea576001600160a01b03191617600155005b60405162461bcd60e51b815260206004820152601b60248201527f4f6e6c79206f776e65722063616e206368616e6765206f776e657200000000006044820152606490fd5b3461009c57600036600319011261009c576001546040516001600160a01b039091168152602090f35b3461009c57600036600319011261009c5760005480156100865760001901600055005b3461009c57600036600319011261009c576020906000548152f35b3461009c57600036600319011261009c576000805500fea2646970667358221220475d224d82e1d38473d6a1efcf35ecdad32498491f770187013dfa1696342e5b64736f6c634300081c0033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
;
  //const artifact = await loadABI(ARTIFACT_PATH);
  return new ethers.Contract(contractAddress, artifact.abi, signer);
}

async function handleIncrement() {
  const walletProvider = modal.getWalletProvider();
  if (!walletProvider) throw new Error("Wallet not connect");

  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  if (!signer) throw new Error("Wallet not connected");

  const contract = await getContract(signer);

  const tx = await contract.increment();
  await tx.wait();
}

async function handleDecracement() {
  const walletProvider = modal.getWalletProvider();
  if (!walletProvider) throw new Error("Wallet not connect");

  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  if (!signer) throw new Error("Wallet not connected");

  const contract = await getContract(signer);

  const tx = await contract.decracement();
  await tx.wait();
}

async function handleResetValue() {
  const walletProvider = modal.getWalletProvider();
  if (!walletProvider) throw new Error("Wallet not connect");

  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  if (!signer) throw new Error("Wallet not connected");

  const contract = await getContract(signer);

  const tx = await contract.resetValue();
  await tx.wait();
}

async function handleShowData() {
  const walletProvider = modal.getWalletProvider();
  if (!walletProvider) throw new Error("Wallet not connect");

  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  if (!signer) throw new Error("Wallet not connected");

  const contract = await getContract(signer);

  const num = await contract.value();
  const addr = await contract.owner();

  document.getElementById("number")!.innerText = `${addr.toString()}`;
  document.getElementById("addr")!.innerText = `${num.toString()}`;
}

document.getElementById("showData")!.onclick = async () => {
}

document.getElementById("incrementBtn")!.onclick = async () => {
  handleIncrement();
}

document.getElementById("decracementBtn")!.onclick = async () => {
}

document.getElementById("resetBtn")!.onclick = async () => {
}