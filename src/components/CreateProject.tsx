import { CreateProjectParams, ImmutableXClient } from '@imtbl/imx-sdk';
import React, { useState } from 'react';

interface CreateProjectProps {
  adminClient: ImmutableXClient | undefined;
}

const CreateProject = ({ adminClient }: CreateProjectProps) => {
  const [projectParams, setProjectParams] =
    useState<CreateProjectParams>(Object);

  const createproject = async () => {
    if (
      !projectParams.company_name ||
      !projectParams.contact_email ||
      !projectParams.name
    ) {
      return;
    }
    if (adminClient === undefined) {
      return;
    }
    try {
      const res = await adminClient.createProject(projectParams);
      console.log(res);
      projectParams.company_name = '';
      projectParams.contact_email = '';
      projectParams.name = '';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="text-center">Create Project</h3>
      <div className="flex flex-col justify-center items-center">
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
