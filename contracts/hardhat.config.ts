import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      // rpc url, change it according to your ganache configuration
      url: 'http://localhost:8545',
      // the private key of signers, change it according to your ganache user
      accounts: [
        '0x602f6c7ae916238c6e56f70f320e3421b93fb5548e171a8dd64f36c6846e9f2d',
        '0x3d6c4e98fdd1059cc3eaf3795a131f571bef0ab1d20db4ee62f3b88163fed2d1',
        '0xc5c79012eadec694a6fa33b68b6a92fdf204e5a4ae72e65462448711a12d6f15',
        '0x0349b484f26d9c1a78306a6da36675822c8c2c392f955182742c274153163ab3',
        '0x6d4515a083d8ee6346888d2facf882efb311ee3f46986dd92f0a8a965faadfed'
      ]
    },
  },
};

export default config;
