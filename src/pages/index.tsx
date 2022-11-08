import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ImmutableXClient } from '@imtbl/imx-sdk';
import CreateProject from '../components/CreateProject';
import { useadminClient } from '../hooks/useAdminClient';
import DeployContract from '../components/DeployContract';
import CreateCollection from '../components/CreateCollection';
import MintNft from '../components/MintNft';
import AddMetaDataSchema from '../components/AddMetaDataSchema';
import UploadDirectory from '../components/UploadDirectory';
import GenerateMetadataFiles from '../components/GenerateMetadataFiles';

enum FORMSTATE {
  uploadDirectory = 'Upload',
  generateMetadata = 'GenerateMetadata',
  createProject = 'CreateProject',
  deployContract = 'DeployContract',
  createCollection = 'CreateCollection',
  addMetaDataSchema = 'AddMetadataSchema',
  minCollection = 'MintCollection',
}

const Home: NextPage = () => {
  const adminClient: ImmutableXClient | undefined = useadminClient();
  const [formState, setFormState] = useState<FORMSTATE>(
    FORMSTATE.uploadDirectory
  );

  const nextFormState = () => {
    const options = Object.values(FORMSTATE);
    const currentIndex = options.indexOf(formState);
    if (currentIndex < options.length - 1)
      setFormState(options[currentIndex + 1]);
  };

  const previousFormState = () => {
    const options = Object.values(FORMSTATE);
    const currentIndex = options.indexOf(formState);
    if (currentIndex > 0) setFormState(options[currentIndex - 1]);
  };

  useEffect(() => {
    if (adminClient) {
      console.log(adminClient);
    }
  }, [adminClient]);

  return (
    <div className="h-screen">
      <Head>
        <title>IMX Onboarding</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <div className="absolute top-1/4 left-1/2">
          <div className="relative -left-1/2 p-4 ">
            <div className="h-screen-1/2 flex justify-center items-center">
              <div className="mr-8">
                <button
                  className="bg-teal-700 rounded p-2"
                  onClick={previousFormState}
                >
                  Previous
                </button>
              </div>
              <div className="border border-teal-600 rounded p-2">
                {formState === FORMSTATE.uploadDirectory ? (
                  <UploadDirectory />
                ) : formState === FORMSTATE.generateMetadata ? (
                  <GenerateMetadataFiles />
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
              <div className="ml-8">
                <button
                  className="bg-teal-700 rounded p-2"
                  onClick={nextFormState}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
