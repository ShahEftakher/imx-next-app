import axios from 'axios';
import React, { useState } from 'react';

const UploadDirectory = () => {
  const [filePath, setFilePath] = useState('');

  const uploadDirectory = async () => {
    if (!filePath) {
      return;
    }

    try {
      const res = await axios.post(`/api/UploadDirectory?filePath=${filePath}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-4">
        <div>
          <label>File Path: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            placeholder="Insert the file path to direcotry"
            onChange={(e) => {
              setFilePath(e.target.value);
            }}
          />
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg mt-4"
          onClick={uploadDirectory}
        >
          Mint Tokens
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border-teal-600 p-2 mt-3">
        {/* <label>Contract deployed on: </label> <p>{}</p> */}
      </div>
    </div>
  );
};

export default UploadDirectory;
