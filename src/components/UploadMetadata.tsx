import React, { useRef, useState, useEffect, useContext } from 'react';
import { StateContext } from '../context/context';
import { UploadDirectoryV2 } from '../helper/uploadDirectory';
import { cidToHTTP } from '../utils/cidToHTTP';

const UploadMetadata = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState(Object);
  const { metadataURL, setMetadataURL } = useContext(StateContext);

  const uploadMetadaDirectory = async () => {
    try {
      const res = await UploadDirectoryV2(files);
      console.log(res);
      console.log(cidToHTTP(res));
      setMetadataURL(cidToHTTP(res));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute('directory', '');
      ref.current.setAttribute('webkitdirectory', '');
    }
  }, [ref]);

  return (
    <div>
      <h3 className="text-center">Upload Metadata</h3>
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
          onClick={uploadMetadaDirectory}
        >
          Upload Metadata Directory
        </button>
        {metadataURL ? (
          <div className="flex flex-col justify-center items-center border-teal-600 p-2 mt-3">
            <div className="text-cyan-700">
              <a target="_blank" href={metadataURL} rel="noopener noreferrer">
                {' '}
                {metadataURL}
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

export default UploadMetadata;
