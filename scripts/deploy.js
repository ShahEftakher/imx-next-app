const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying Contract with the account:', deployer.address);
  console.log('Account Balance:', (await deployer.getBalance()).toString());

  const owner = '0x0d206Ba67CD2c6e697ceeb2aabaBBD1d93Ffb99f';
  const imx = '0xBaf58F61c294e40ebA44DE60e2Aed98B56D27116';

  const NFT = await hre.ethers.getContractFactory('NftContract');
  const nft = await NFT.deploy('ESD Collection', 'ESD', owner, imx);
  await nft.deployed();

  const configFile = `export const NFT_ADDRESS = "${nft.address}";`;

  fs.writeFileSync('./config.js', configFile);

  console.log(`Contract deployed to ${nft.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
