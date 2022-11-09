import axios from 'axios';
import React, { useContext, useState } from 'react';
import { StateContext } from '../context/context';

const GenerateMetadataFiles = () => {
  const [startingID, setStartingID] = useState<number>(0);
  const [tokenNumber, setTokenNumber] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const { contentIPFSUrl } = useContext(StateContext);

  const generateMetadata = async () => {
    try {
      const res = await axios.post(`/api/generatemetadatafiles`, {
        desc: description,
        startingID: startingID,
        tokenNumber: tokenNumber,
        contentUrl: contentIPFSUrl,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-4">
        <h3>Generate metadate files</h3>
        <div>
          <label>Starting Token ID: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            onChange={(event) => {
              setStartingID(Number(event.target.value));
            }}
          />
        </div>
        <div>
          <label>Total tokens: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            onChange={(event) => {
              setTokenNumber(Number(event.target.value));
            }}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg mt-4"
          onClick={generateMetadata}
        >
          Generate Metadata
        </button>
        {contentIPFSUrl ? (
          <div className="flex flex-col justify-center items-center border-teal-600 p-2 mt-3">
            <div className="text-cyan-700">
              <label>Content URL: </label>
              <a
                target="_blank"
                href={contentIPFSUrl}
                rel="noopener noreferrer"
              >
                {' '}
                {contentIPFSUrl}
              </a>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default GenerateMetadataFiles;
