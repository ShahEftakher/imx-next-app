import { CreateCollectionParams } from '@imtbl/imx-sdk';
import React, { Dispatch, SetStateAction } from 'react';

interface CreateCollectionProps {
  collectionParams: CreateCollectionParams;
  setCollectionParams: Dispatch<
    SetStateAction<
      {
        name: string;
        contract_address: string;
        owner_public_key: string;
        project_id: number;
      } & {
        metadata_api_url?: string | undefined;
        description?: string | undefined;
        icon_url?: string | undefined;
        collection_image_url?: string | undefined;
      }
    >
  >;
  createCollection: () => {};
}

const CreateCollection = ({
  collectionParams,
  setCollectionParams,
  createCollection,
}: CreateCollectionProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <label>Contract Name: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={collectionParams.name}
            onChange={(event) => {
              setCollectionParams((preState: any) => ({
                ...preState,
                name: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Project ID: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={collectionParams.project_id}
            onChange={(event) => {
              setCollectionParams((preState: any) => ({
                ...preState,
                project_id: event.target.value,
              }));
            }}
          />
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg"
          onClick={createCollection}
        >
          Deploy Contract
        </button>
      </div>
    </div>
  );
};

export default CreateCollection;
