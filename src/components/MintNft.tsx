import { ImmutableMethodParams } from '@imtbl/imx-sdk';
import React, { useContext, useState } from 'react';
import { StateContext } from '../context/context';
import { getSigner } from '../helper/getSigner';
import { AdminClientProps } from '../interface/AdminClientProps';

const MintNft = ({ adminClient }: AdminClientProps) => {
  const [number, setNumber] = useState<number>(0);
  const [tokenId, setTokenId] = useState<number>(0);
  const [contractAddress, setContractAddress] = useState<string>();

  const { deployedAddress } = useContext(StateContext);

  const minNft = async () => {
    if (!number || !tokenId) {
      return;
    }
    const tokens = Array.from({ length: number }, (_, i) => i).map((i) => ({
      id: (tokenId + i).toString(),
      blueprint: 'onchain-metadata',
    }));

    const signer = await (await getSigner()).getAddress();

    const payload: ImmutableMethodParams.ImmutableOffchainMintV2ParamsTS = [
      {
        contractAddress: contractAddress ? contractAddress : deployedAddress,
        users: [
          {
            etherKey: signer.toLowerCase(),
            tokens,
          },
        ],
      },
    ];

    try {
      const res = await adminClient?.mintV2(payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    console.log(tokens);
  };

  return (
    <div>
      <h3 className="text-center">Mint NFT</h3>
      <div className="flex flex-col justify-center items-center mt-4">
        <div>
          <label>Contract Addess: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            placeholder={deployedAddress}
            onChange={(e) => {
              setContractAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Total Tokens:</label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="number"
            onChange={(e) => {
              setNumber(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <label>Starting TokenId:</label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="number"
            onChange={(e) => {
              setTokenId(Number(e.target.value));
            }}
          />
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg mt-4"
          onClick={minNft}
        >
          Mint Tokens
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border-teal-600 p-2 mt-3">
        {/* <label>Contract deployed on: </label> <p>{}</p> */}
      </div>
    </div>
  );
};

export default MintNft;
