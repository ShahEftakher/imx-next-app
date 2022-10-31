import { ImmutableXClient } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
import {
  NEXT_APP_SANDBOX_ENV_URL,
  SANDBOX_REGISTRATION_ADDRESS,
  SANDBOX_STARK_CONTRACT_ADDRESS,
} from '../config';
import { getSigner } from '../helper/getSigner';

export const useadminClient = () => {
  const [adminClient, setAdminClient] = useState<
    ImmutableXClient | undefined
  >();

  useEffect(() => {
    initAdminClient();
  }, []);

  const initAdminClient = async () => {
    const signer = await getSigner();
    const adminadminClient = await ImmutableXClient.build({
      publicApiUrl: NEXT_APP_SANDBOX_ENV_URL,
      registrationContractAddress: SANDBOX_REGISTRATION_ADDRESS,
      starkContractAddress: SANDBOX_STARK_CONTRACT_ADDRESS,
      signer: signer,
    });
    setAdminClient(adminadminClient);
  };

  return adminClient;
};
