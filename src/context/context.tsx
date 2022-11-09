import React, { createContext, useState } from 'react';

export const StateContext = createContext<any>(Object);

const StateContextProvider = (props: any) => {
  const [deployedAddress, setDeployedAddress] = useState<string>('');
  const [contentIPFSUrl, setContentIPFSUrl] = useState<string>('');
  const [metadataURL, setMetadataURL] = useState<string>('');

  return (
    <StateContext.Provider
      value={{
        deployedAddress,
        setDeployedAddress,
        contentIPFSUrl,
        setContentIPFSUrl,
        metadataURL,
        setMetadataURL,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
