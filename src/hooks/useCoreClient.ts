import { Config, ImmutableX } from '@imtbl/core-sdk';
import { useEffect, useState } from 'react';

export const useCoreClient = () => {
  const [client, setClient] = useState<ImmutableX>(Object);

  useEffect(() => {
    initClient();
  }, []);

  const initClient = async () => {
    const config = Config.SANDBOX;
    const client = new ImmutableX(config);
    setClient(client);
  };

  return client;
};
