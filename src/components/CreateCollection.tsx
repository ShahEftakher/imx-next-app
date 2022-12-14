import { CreateCollectionParams } from '@imtbl/imx-sdk';
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../context/context';
import { AdminClientProps } from '../interface/AdminClientProps';

const CreateCollection = ({ adminClient }: AdminClientProps) => {
  const [collectionParams, setCollectionParams] =
    useState<CreateCollectionParams>(Object);

  const { deployedAddress, metadataURL } = useContext(StateContext);

  const createCollection = async () => {
    if (!adminClient) {
      return;
    }
    console.log(metadataURL);
    if (
      !collectionParams.contract_address ||
      !collectionParams.name ||
      !collectionParams.project_id ||
      !collectionParams.owner_public_key
    ) {
      return;
    }
    try {
      console.log(collectionParams);
      const res = await adminClient.createCollection(collectionParams);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (metadataURL) {
      setCollectionParams((preState: any) => ({
        ...preState,
        metadata_api_url: metadataURL,
      }));
      setCollectionParams((preState: any) => ({
        ...preState,
        contract_address: deployedAddress,
      }));
    }
  }, [metadataURL]);

  return (
    <div>
      <h3 className="text-center">Create Collection</h3>
      <div className="flex flex-col justify-center items-center mt-4">
        <div>
          <label>Collection Name: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={collectionParams.name}
            onChange={(event) => {
              setCollectionParams((preState) => ({
                ...preState,
                name: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Contract address: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={collectionParams.contract_address}
            onChange={(event) => {
              setCollectionParams((preState: any) => ({
                ...preState,
                contract_address: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Uncompressed Public address: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={collectionParams.owner_public_key}
            onChange={(event) => {
              setCollectionParams((preState) => ({
                ...preState,
                owner_public_key: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Metadata API URL: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={collectionParams.metadata_api_url}
            onChange={(event) => {
              setCollectionParams((preState: any) => ({
                ...preState,
                metadata_api_url: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Collection Display Image: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={collectionParams.collection_image_url}
            onChange={(event) => {
              setCollectionParams((preState: any) => ({
                ...preState,
                collection_image_url: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Project ID: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="number"
            value={collectionParams.project_id}
            onChange={(event) => {
              setCollectionParams((preState: any) => ({
                ...preState,
                project_id: Number(event.target.value),
              }));
            }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center border-teal-600 p-2 m-4">
        <label>Contract deployed on: </label> <p>{deployedAddress}</p>
      </div>
      <div className="flex justify-center mt-3">
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg"
          onClick={createCollection}
        >
          Create Collection
        </button>
      </div>
    </div>
  );
};

export default CreateCollection;
