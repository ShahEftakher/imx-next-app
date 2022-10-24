import { ImmutableXClient } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
import { NEXT_APP_SANDBOX_ENV_URL } from '../config';

export const useClient = () => {
  const [client, setClient] = useState(Object);

  useEffect(() => {
    initClient();
  }, []);

  const initClient = async () => {
    const imxApiUrl: string = NEXT_APP_SANDBOX_ENV_URL;
    const tempClient = await ImmutableXClient.build({
      publicApiUrl: imxApiUrl,
    });
    console.log(tempClient);
    setClient(tempClient);
  };

  return client;
};
