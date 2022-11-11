import {
  AddMetadataSchemaToCollectionParams,
  MetadataTypes,
} from '@imtbl/imx-sdk';
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../context/context';
import { AdminClientProps } from '../interface/AdminClientProps';

const AddMetaDataSchema = ({ adminClient }: AdminClientProps) => {
  const [metadataSchema, setMetaDataSchema] =
    useState<AddMetadataSchemaToCollectionParams>(Object);
  const { deployedAddress } = useContext(StateContext);

  const addMetadataSchema = async () => {
    try {
      console.log(deployedAddress);
      const res = await adminClient?.addMetadataSchemaToCollection(
        deployedAddress,
        metadataSchema
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMetaDataSchema({
      metadata: [
        {
          name: 'name',
          type: MetadataTypes.Text,
        },
        {
          name: 'description',
          type: MetadataTypes.Text,
        },
        {
          name: 'image_url',
          type: MetadataTypes.Text,
        },
      ],
    });
  }, []);

  return (
    <div>
      <h3 className="text-center">Add Metadataschema</h3>
      <div className="flex flex-col justify-center items-center mt-4 p-4">
        <div>
          {metadataSchema.metadata?.map((data) => (
            <p key={data.name}>{JSON.stringify(data, null, 2)}</p>
          ))}
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg mt-4"
          onClick={addMetadataSchema}
        >
          Add metadata schema
        </button>
      </div>
    </div>
  );
};

export default AddMetaDataSchema;
