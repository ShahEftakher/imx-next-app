//update update collection

import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ERC721TokenType, ImmutableXClient, Link } from '@imtbl/imx-sdk';
import {
  ALCHEMY_API_ENDPOINT,
  NEXT_APP_SANDBOX_ENV_URL,
  NEXT_APP_SANDBOX_LINK_URL,
  SANDBOX_REGISTRATION_ADDRESS,
  SANDBOX_STARK_CONTRACT_ADDRESS,
} from '../../config';
import { useClient } from '../../hooks/useClient';
import { ethers } from 'ethers';
import { configureProvider } from '../../helper/configureProvider';
import { useadminClient } from '../../hooks/useAdminClient';

interface UserInterface {
  address: string;
  starkPublicKey: string;
  ethNetwork: string;
  providerPreference: string;
}

const Home: NextPage = () => {
  const [user, setUser] = useState<UserInterface>(Object);
  const [assets, setAssets] = useState(Array);
  const [sellOrders, setSellOrders] = useState(Array);
  const [orderCursor, setOrderCursor] = useState('');
  const [collectionCursor, setCollectionCursor] = useState('');
  const [collections, setCollections] = useState(Array);
  const [projects, setProjects] = useState<Array<any> | undefined>();
  //without signer
  const client: ImmutableXClient = useClient();
  //with signer
  const adminClient: ImmutableXClient | undefined = useadminClient();

  const link = new Link(NEXT_APP_SANDBOX_LINK_URL);

  const linkSetup = async () => {
    const res = await link.setup({});
    setUser(res);
  };

  //possible with client initialized by apiAddress
  const getAllCollection = async () => {
    const tempCollections = await client.getCollections({
      cursor: collectionCursor,
    });
    setCollectionCursor(tempCollections.cursor);
    setCollections(tempCollections.result);
    console.log(tempCollections.cursor);
  };

  //projects of an user
  const getProjects = async () => {
    const res = await adminClient?.getProjects();
    console.log(res?.result);
    setProjects(res?.result);
  };

  //sell listings
  const getSellOrders = async () => {
    const tempOrders = await client.getOrdersV3({ cursor: orderCursor });
    console.log(tempOrders.cursor);
    setOrderCursor(tempOrders.cursor);
    setSellOrders(tempOrders.result);
  };

  //user assets
  const getUserAssets = async () => {
    const tempAssets = await client.getAssets({ user: user.address });
    setAssets(tempAssets.result);
    console.log(tempAssets);
  };

  //possible to know anyones balance
  const getBalance = async () => {
    const balance = await client.getBalance({
      user: '0x44C61C790DC1CE42bff80918BFbA2Da9Bcc43302',
      tokenAddress: 'eth',
    });
    console.log(balance.balance.toString());
  };

  //specific collection information
  const getCollectionInfo = async () => {
    const tempCollectionInfo = await client.getCollection({
      address: '0x3a334A490Fdd7f1c8BB7e3e004dCb6832E05DE9c',
    });

    console.log(tempCollectionInfo);
  };

  //mint function
  const mintNFTV2 = async () => {
    const provider = await configureProvider();
    const signer = provider.getSigner();
    console.log(signer);
    const minterClient = await ImmutableXClient.build({
      publicApiUrl: NEXT_APP_SANDBOX_ENV_URL,
      signer,
      starkContractAddress: SANDBOX_STARK_CONTRACT_ADDRESS,
      registrationContractAddress: SANDBOX_REGISTRATION_ADDRESS,
    });

    // const projects = await minterClient.getProjects();

    const result = await minterClient.mintV2([
      {
        users: [
          {
            etherKey:
              '0x8aE41d03aac4f8D0f8eda73273B0dCFe40306f34'.toLowerCase(),
            tokens: [
              {
                id: '5',
                blueprint: 'sazid',
              },
            ],
          },
        ],
        contractAddress: '0xe5d2f645f20938470cb50f3736e010042b69c77a',
      },
    ]);
    console.log(result);
  };

  const clearData = () => {
    setAssets([]);
    setCollectionCursor('');
    setCollections([]);
    setOrderCursor('');
    setSellOrders([]);
    setProjects([]);
  };

  //transfer
  const transferAsset = async () => {
    const tempList: {
      type: ERC721TokenType;
      tokenId: any;
      toAddress: string;
      tokenAddress: any;
    }[] = [];

    assets.map(async (asset: any) => {
      console.log(asset.token_id);
      if (
        asset.token_id !== '1' &&
        asset.token_id !== '2' &&
        asset.token_id !== '3'
      ) {
        tempList.push({
          type: ERC721TokenType.ERC721,
          tokenId: asset.token_id,
          toAddress: '0x3a334A490Fdd7f1c8BB7e3e004dCb6832E05DE9c',
          tokenAddress: asset.token_address,
        });
      }
    });

    try {
      const result = await link.transfer(tempList);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCollection = async () => {
    try {
      const res = await adminClient?.updateCollection(
        '0x55967b06d35da79d819cbb1ec7c8832f0df7ac4c',
        {
          metadata_api_url:
            'https://nftstorage.link/ipfs/bafybeiegywg6s7o3ucbroerlm47hyymgzdn7rqpqbm6k6zgitkku7cqlmy',
          description: 'updated description',
        }
      );

      console.log(res);
    } catch (error) {}
  };

  //question: how is marketplace connected with metamask
  //how is getting the signer for transaction
  //how is retrieveing data without signer

  //find a way to retrieve data without signer
  //while setting up the client
  //

  return (
    <div className="h-screen">
      <Head>
        <title>IMX Onboarding</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <div className="flex justify-between">
          <button
            className="border-4 p-2 bg-blue-600 rounded-lg"
            onClick={linkSetup}
          >
            Link Wallet
          </button>
          <button
            className="border-4 p-2 bg-blue-600 rounded-lg"
            onClick={getBalance}
          >
            Get Balance
          </button>
          <button
            className="border-4 p-2 bg-blue-600 rounded-lg"
            onClick={getSellOrders}
          >
            Get Orders
          </button>
          <button
            className="border-4 p-2 bg-blue-600 rounded-lg"
            onClick={getAllCollection}
          >
            Get Collections
          </button>
          <button
            className="border-4 p-2 bg-green-600 rounded-lg"
            onClick={getCollectionInfo}
          >
            Get Collection
          </button>
          <button
            className="border-4 p-2 bg-green-600 rounded-lg"
            onClick={transferAsset}
          >
            Transfer
          </button>
          <button
            className="border-4 p-2 bg-green-600 rounded-lg"
            onClick={getProjects}
          >
            Get Project
          </button>
          <button
            className="border-4 p-2 bg-yellow-600 rounded-lg"
            onClick={mintNFTV2}
          >
            Mint
          </button>
          <button
            className="border-4 p-2 bg-blue-600 rounded-lg"
            onClick={getUserAssets}
          >
            Get Assets
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={updateCollection}
            className="border-4 p-2 bg-red-600 rounded-lg"
          >
            Update Collection
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={clearData}
            className="border-4 p-2 bg-red-600 rounded-lg"
          >
            clear
          </button>
        </div>
        <div className="flex flex-col justify-center items-center border-teal-600 p-2 m-4">
          <p className="">{orderCursor}</p>
          <p className="">{collectionCursor}</p>
          <p className="">{JSON.stringify(user, null, 2)}</p>
          <div>
            {assets?.map((asset: any) => (
              <div
                className="mb-4 border-2 border-black rounded-md p-4"
                key={asset.created_at + `${Math.random()}}`}
              >
                <pre> {JSON.stringify(asset, null, 4)}</pre>
              </div>
            ))}
          </div>
          <div>
            {projects?.map((project: any) => (
              <div
                className="mb-4 border-2 border-black rounded-md p-4"
                key={project.created_at + `${Math.random()}}`}
              >
                <pre> {JSON.stringify(project, null, 4)}</pre>
              </div>
            ))}
          </div>
          <div>
            {collections?.map((collection: any) => (
              <pre className="mb-4">{JSON.stringify(collection, null, 4)}</pre>
            ))}
          </div>
          <div>
            {sellOrders?.map((order: any) => (
              <pre className="mb-4">{JSON.stringify(order, null, 4)}</pre>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
