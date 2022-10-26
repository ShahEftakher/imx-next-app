import React from 'react';

interface ListProjectProps {
  projectList: Array<any>;
}

const ListProjects = ({ projectList }: ListProjectProps) => {
  return (
    <div>
      {projectList.map((project) => (
        <p key={project.id}>{project.id}</p>
      ))}
    </div>
  );
};

export default ListProjects;
