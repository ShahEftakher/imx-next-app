import React, { useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from '../context/context';
import { UploadDirectoryV2 } from '../helper/uploadDirectory';
import { cidToHTTP } from '../utils/cidToHTTP';

const UploadContentDirectory = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState(Object);
  const { contentIPFSUrl, setContentIPFSUrl } = useContext(StateContext);

  const uploadDirectoryToIpfs = async () => {
    try {
      if (!files) {
        return;
      }
      const response = await UploadDirectoryV2(files);
      setContentIPFSUrl(cidToHTTP(response));
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
      <div className="flex flex-col justify-center items-center mt-4">
        <h3>Upload the Images</h3>
        <div>
          <label>Folder: </label>
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
      {contentIPFSUrl ? (
        <div className="flex flex-col justify-center items-center border-teal-600 p-2 mt-3">
          {/* <label>CID: </label> <p>{ipfsDirCID}</p> */}
          <div className="text-cyan-700">
            <a target="_blank" href={contentIPFSUrl} rel="noopener noreferrer">
              {' '}
              {contentIPFSUrl}
            </a>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UploadContentDirectory;
