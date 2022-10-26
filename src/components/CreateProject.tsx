import { CreateProjectParams } from '@imtbl/imx-sdk';
import React, { Dispatch, SetStateAction } from 'react';

interface CreateProjectProps {
  projectParams: CreateProjectParams;
  setProjectParams: Dispatch<
    SetStateAction<{
      name: string;
      company_name: string;
      contact_email: string;
    }>
  >;
}

const CreateProject = ({
  projectParams,
  setProjectParams,
}: CreateProjectProps) => {
  const createproject = () => {};
  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <label>Name: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={projectParams.name}
            onChange={(event) => {
              setProjectParams((preState) => ({
                ...preState,
                name: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={projectParams.contact_email}
            onChange={(event) => {
              setProjectParams((preState) => ({
                ...preState,
                contact_email: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label>Company Name: </label>
          <input
            className="border-2 border-cyan-400 rounded"
            type="text"
            value={projectParams.company_name}
            onChange={(event) => {
              setProjectParams((preState: any) => ({
                ...preState,
                company_name: event.target.value,
              }));
            }}
          />
        </div>
        <button
          className="border-4 p-2 bg-cyan-600 rounded-lg"
          onClick={createproject}
        >
          Create Project
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
