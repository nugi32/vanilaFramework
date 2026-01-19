import { modal } from "./Wallet.ts";
import { BrowserProvider, ethers } from "ethers";
import { contractAddress } from "./address/addressConfig.ts";
import type { Eip1193Provider } from "ethers";
import { withUI } from "./global-Ux/loading-ui.ts";

const ARTIFACT_PATH = "/artifact/counter.json";

export async function loadABI(path : string) {
  const res = await fetch(path);
  const text = await res.text();
  console.log('ABI raw response:', text.slice(0, 200));

  return JSON.parse(text);
}
async function getContract(signer : ethers.Signer) {
  const artifact = await loadABI(ARTIFACT_PATH);
  return new ethers.Contract(contractAddress, artifact.abi, signer);
}

/******************************************************************************************************/

async function handleIncrement() {
  return withUI(
    async () => {
const walletProvider = modal.getWalletProvider()  as Eip1193Provider;
  if (!walletProvider) throw new Error("Wallet not connect");

  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  if (!signer) throw new Error("Wallet not connected");

  const contract = await getContract(signer);

  const tx = await contract.increment();
  await tx.wait();
    handleShowData();
    },
    {
      loadingText: "Incrementing counter...",
      successMessage: "Counter incremented successfully"
    }
  );
}

async function handleDecracement() {
  return withUI(
    async () => {
  const walletProvider = modal.getWalletProvider()  as Eip1193Provider;
  if (!walletProvider) throw new Error("Wallet not connect");

  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  if (!signer) throw new Error("Wallet not connected");

  const contract = await getContract(signer);

  const tx = await contract.decracement();
  await tx.wait();
    handleShowData();
  },
    {
      loadingText: "Decrementing counter...",
      successMessage: "Counter decremented successfully"
    }
  );
}

async function handleResetValue() {
  return withUI(
    async () => {
  const walletProvider = modal.getWalletProvider()  as Eip1193Provider;
  if (!walletProvider) throw new Error("Wallet not connect");

  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  if (!signer) throw new Error("Wallet not connected");

  const contract = await getContract(signer);

  const tx = await contract.resetValue();
  await tx.wait();
    handleShowData();
  },
    {
      loadingText: "Resetting counter...",
      successMessage: "Counter reset successfully"
    }
  );
}

async function handleShowData() {
  const walletProvider = modal.getWalletProvider()  as Eip1193Provider;
  if (!walletProvider) throw new Error("Wallet not connect");

  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  if (!signer) throw new Error("Wallet not connected");

  const contract = await getContract(signer);

  const num = await contract.value();
  const addr = await contract.owner();

  document.getElementById("number")!.innerText = `${num.toString()}`;
  document.getElementById("addr")!.innerText = `${addr.toString()}`;
}

/******************************************************************************************************/

document.getElementById("showData")!.onclick = async () => {
  handleShowData();
}

document.getElementById("incrementBtn")!.onclick = async () => {
  handleIncrement();
}

document.getElementById("decracementBtn")!.onclick = async () => {
  handleDecracement();
}

document.getElementById("resetBtn")!.onclick = async () => {
  handleResetValue();
}
