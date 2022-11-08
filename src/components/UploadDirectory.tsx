// import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from '../context/context';
import { UploadDirectoryV2 } from '../helper/uploadDirectory';

const UploadDirectory = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState(Object);
  const { isfsDirCID, setIpfsDirCID } = useContext(StateContext);

  const uploadDirectoryToIpfs = async () => {
    const response = await UploadDirectoryV2(files);
    setIpfsDirCID(response);
  };

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute('directory', '');
      ref.current.setAttribute('webkitdirectory', '');
    }
  }, [ref]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-4">
        <div>
          <label>File Path: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="file"
            ref={ref}
            placeholder="Select the direcotry"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
          />
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg mt-4"
          onClick={uploadDirectoryToIpfs}
        >
          Upload Files
        </button>
      </div>
      <div className="flex flex-col justify-center items-center border-teal-600 p-2 mt-3">
        <label>CID: </label> <p>{isfsDirCID}</p>
      </div>
    </div>
  );
};

export default UploadDirectory;
