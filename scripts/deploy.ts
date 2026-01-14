import { ethers, network } from "hardhat";
import { parseEther, formatEther } from "ethers";
import { writeFileSync } from "fs";
import { join } from "path";

async function main() {
  console.log("Starting contract deployment !");

  // ==== PRE-FLIGHT CHECK ====
  const [deployer] = await ethers.getSigners();
  const deployerAddr = await deployer.getAddress();
  const deployerBalance = await ethers.provider.getBalance(deployerAddr);

  console.log(`Deployer address: ${deployerAddr} — balance: ${formatEther(deployerBalance)} ETH`);

  const minBalance = parseEther("0.01");
  if (deployerBalance < minBalance) {
    throw new Error(
      `Deployer ${deployerAddr} has insufficient balance (${formatEther(
        deployerBalance
      )} ETH). Fund this account on ${network.name} or set PRIVATE_KEY to a funded account in your .env`
    );
  }

  // ======================================================
  // 3) stateVariable — NORMAL CONTRACT
  // ======================================================
  console.log("Deploying Smart Contract (regular contract)...");

  const ContractFactory = await ethers.getContractFactory("counter");

const svArgs = [  //param in constructor
  0,
  deployerAddr
];



  const contract = await ContractFactory.deploy(...svArgs);
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("Smart Contract deployed to:", contractAddress);

  // ======================================================
  // SAVE ALL ADDRESS TO JSON (COMPLETE)
  // ======================================================

  const addresses = {
    network: network.name,
    deployer: deployerAddr,

    Contract: {
      address: contractAddress,
    },
  };

  const addrPath = join(
    __dirname,
    "..",
    "frontend",
    "src",
    "address",
    "addresses.json"
  );

  writeFileSync(addrPath, JSON.stringify(addresses, null, 2));

  console.log("\nDeployment completed! Addresses saved to frontend/src/address/addresses.json");

  return addresses;
}

main()  
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });