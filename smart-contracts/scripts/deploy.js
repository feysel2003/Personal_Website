const hre = require("hardhat");

async function main() {
  console.log("Deploying PortfolioGuestbook...");

  const PortfolioGuestbook = await hre.ethers.getContractFactory("PortfolioGuestbook");
  const guestbook = await PortfolioGuestbook.deploy();

  await guestbook.waitForDeployment();

  console.log(`PortfolioGuestbook deployed to: ${await guestbook.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});