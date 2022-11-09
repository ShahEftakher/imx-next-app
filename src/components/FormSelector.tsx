import { ImmutableXClient } from '@imtbl/imx-sdk';
import React from 'react';
import { FORMSTATE } from '../config/FormState';
import AddMetaDataSchema from './AddMetaDataSchema';
import CreateCollection from './CreateCollection';
import CreateProject from './CreateProject';
import DeployContract from './DeployContract';
import GenerateMetadataFiles from './GenerateMetadataFiles';
import MintNft from './MintNft';
import UploadContentDirectory from './UploadContentDirectory';
import UploadMetadata from './UploadMetadata';

interface FormSelectorProps {
  formState: FORMSTATE;
  adminClient: ImmutableXClient | undefined;
}

const FormSelector = ({ formState, adminClient }: FormSelectorProps) => {
  return (
    <div>
      <div className="border border-teal-600 rounded p-2">
        {formState === FORMSTATE.uploadDirectory ? (
          <UploadContentDirectory />
        ) : formState === FORMSTATE.generateMetadata ? (
          <GenerateMetadataFiles />
        ) : formState === FORMSTATE.uploadMetadata ? (
          <UploadMetadata />
        ) : formState === FORMSTATE.deployContract ? (
          <DeployContract />
        ) : formState === FORMSTATE.createProject ? (
          <CreateProject adminClient={adminClient} />
        ) : formState === FORMSTATE.createCollection ? (
          <CreateCollection adminClient={adminClient} />
        ) : formState === FORMSTATE.addMetaDataSchema ? (
          <AddMetaDataSchema adminClient={adminClient} />
        ) : formState === FORMSTATE.minCollection ? (
          <MintNft adminClient={adminClient} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default FormSelector;
