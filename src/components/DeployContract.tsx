import React, { Dispatch, SetStateAction } from 'react';
import { ContractCreationProps } from '../interface/ContractCreationProps';

interface DeployProps {
  nftContractInfo: ContractCreationProps;
  setNftContractInfo: Dispatch<SetStateAction<ContractCreationProps>>;
  deployContract: () => {};
}

const DeployContract = ({
  nftContractInfo,
  setNftContractInfo,
  deployContract,
}: DeployProps) => {
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
