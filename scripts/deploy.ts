import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const KaiaToken = await ethers.getContractFactory("KaiaToken");
  const token = await KaiaToken.deploy(
    "Kaia Token Creator", // name
    "KTC", // symbol
    deployer.address // initial owner
  );

  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("Token deployed to:", address);
  console.log("Please update the contract address in src/App.jsx with:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 