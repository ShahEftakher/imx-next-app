import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

export const getSigner = async (): Promise<ethers.providers.JsonRpcSigner> => {
  const web3Modal = new Web3Modal();
  const connectMM = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connectMM);
  return provider.getSigner();
};
