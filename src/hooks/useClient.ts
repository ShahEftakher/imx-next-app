import { ImmutableXClient } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
import {
  NEXT_APP_SANDBOX_ENV_URL,
  SANDBOX_REGISTRATION_ADDRESS,
  SANDBOX_STARK_CONTRACT_ADDRESS,
} from '../config';

export const useClient = (user: string | undefined) => {
  const [client, setClient] = useState(Object);

  useEffect(() => {
    if (user !== undefined) {
      initAdminClient();
    } else {
      initClient();
    }
  }, []);

  const initClient = async () => {
    const imxApiUrl: string = NEXT_APP_SANDBOX_ENV_URL;
    const tempClient = await ImmutableXClient.build({
      publicApiUrl: imxApiUrl,
    });
    console.log(tempClient);
    setClient(tempClient);
  };

  const initAdminClient = async () => {
    const imxApiUrl: string = NEXT_APP_SANDBOX_ENV_URL;
    const tempClient = await ImmutableXClient.build({
      publicApiUrl: imxApiUrl,
      //   signer: user,
      registrationContractAddress: SANDBOX_REGISTRATION_ADDRESS,
      starkContractAddress: SANDBOX_STARK_CONTRACT_ADDRESS,
    });
    console.log(tempClient);
    setClient(tempClient);
  };

  return client;
};
