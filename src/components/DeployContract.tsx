import React, { Dispatch, SetStateAction, useState } from 'react';
import { ContractCreationProps } from '../interface/ContractCreationProps';
import { getSigner } from '../helper/getSigner';
import { ethers } from 'ethers';
import Nft from '../../artifacts/contracts/NftContract.sol/NftContract.json';
import { IMX_CONTRACT_ADDRESS } from '../config';

interface DeployProps {
  setDeployedAddress: Dispatch<SetStateAction<string>>;
}

const DeployContract = ({ setDeployedAddress }: DeployProps) => {
  const [nftContractInfo, setNftContractInfo] =
    useState<ContractCreationProps>(Object);
  const deployContract = async () => {
    const { name, symbol } = nftContractInfo;
    if (!name || !symbol) {
      return;
    }
    const signer = await getSigner();
    const signerAddress = await signer.getAddress();
    const nftContact = new ethers.ContractFactory(
      Nft.abi,
      Nft.bytecode,
      signer
    );
    const deployedNft = await nftContact.deploy(
      name,
      symbol,
      signerAddress,
      IMX_CONTRACT_ADDRESS
    );
    await deployedNft.deployTransaction.wait();
    setNftContractInfo({ name: '', symbol: '' });
    console.log(deployedNft.address);
    setDeployedAddress(deployedNft.address);
  };
  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <label>Contract Name: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={nftContractInfo.name}
            onChange={(event) => {
              setNftContractInfo((preState) => ({
                ...preState,
                name: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Symbol: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={nftContractInfo.symbol}
            onChange={(event) => {
              setNftContractInfo((preState) => ({
                ...preState,
                symbol: event.target.value,
              }));
            }}
          />
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg"
          onClick={deployContract}
        >
          Deploy Contract
        </button>
      </div>
    </div>
  );
};

export default DeployContract;
