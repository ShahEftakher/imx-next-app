/** Not required currently */
import axios from 'axios';
import React, { useState } from 'react';
import { uploadFile } from '../helper/uploadFile';
import { cidToHTTP } from '../utils/cidToHTTP';

const UploadContent = () => {
  const [files, setFiles] = useState<any>();
  const [ipfsUrl, setIPFSUrl] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [tokenId, setTokenId] = useState<string>();

  const handleUpload = async () => {
    console.log(files[0]);
    try {
      const res = await uploadFile(files[0]);
      console.log(res);
      setIPFSUrl(cidToHTTP(res));
    } catch (error) {
      console.log(error);
    }
  };

  const createMetadata = async () => {
    const fileName = files[0].name;
    axios.post('/api/generateMetadata', {
      tokenId: tokenId,
      description,
      name,
      
    });
  };

  return (
    <div>
      <h3 className="text-center">Upload the Image</h3>
      <div className="flex flex-col justify-center items-center mt-4">
        <div>
          <label>Image File: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="file"
            placeholder="Select the direcotry"
            onChange={(e) => {
              console.log(e.target.files);
              setFiles(e.target.files);
            }}
          />
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg mt-4 mb-4"
          onClick={handleUpload}
        >
          Upload Files
        </button>
        <div>
          <label>TokenId: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            onChange={(e) => {
              setTokenId(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Name: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg mt-4"
          onClick={createMetadata}
        >
          Generate Metadata
        </button>
      </div>
      {ipfsUrl ? (
        <div className="flex flex-col justify-center items-center border-teal-600 p-2 mt-3">
          <div className="text-cyan-700">
            <a target="_blank" href={ipfsUrl} rel="noopener noreferrer">
              {' '}
              {ipfsUrl}
            </a>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UploadContent;
