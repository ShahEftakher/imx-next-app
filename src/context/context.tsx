import React, { createContext, useState } from 'react';

export const StateContext = createContext<any>(Object);

const StateContextProvider = (props: any) => {
  const [deployedAddress, setDeployedAddress] = useState<string>('');
  const [ipfsDirCID, setIpfsDirCID] = useState<string>('');
  const [metadataURL, setMetadataURL] = useState<string>('');

  return (
    <StateContext.Provider
      value={{
        deployedAddress,
        setDeployedAddress,
        ipfsDirCID,
        setIpfsDirCID,
        metadataURL,
        setMetadataURL,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
