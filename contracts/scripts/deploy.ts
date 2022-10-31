import { ethers } from "hardhat";

async function main() {
  const studentSocietyDAO = await ethers.getContractFactory("StudentSocietyDAO");
  const lottery = await studentSocietyDAO.deploy();
  await lottery.deployed();
  console.log(`StudentSocietyDAO contract has been deployed successfully in ${lottery.address}`)

  const erc20 = await lottery.myERC20()
  console.log(`erc20 contract has been deployed successfully in ${erc20}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
