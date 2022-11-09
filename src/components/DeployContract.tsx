import React, { useContext, useState } from 'react';
import { ContractCreationProps } from '../interface/ContractCreationProps';
import { getSigner } from '../helper/getSigner';
import { ethers } from 'ethers';
import Nft from '../../artifacts/contracts/Asset.sol/Asset.json';
import { IMX_CONTRACT_ADDRESS } from '../config';
import { StateContext } from '../context/context';

const DeployContract = () => {
  const [nftContractInfo, setNftContractInfo] =
    useState<ContractCreationProps>(Object);
  const { deployedAddress, setDeployedAddress } = useContext(StateContext);
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

    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h3 className="text-center">Deploy Smart contract</h3>
      <div className="flex flex-col justify-center items-center mt-4">
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
          className="border-4 p-2 bg-cyan-600 rounded-lg mt-4"
          onClick={deployContract}
        >
          Deploy Contract
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border-teal-600 p-2 mt-3">
        <label>Contract deployed on: </label> <p>{deployedAddress}</p>
      </div>
    </div>
  );
};

export default DeployContract;
