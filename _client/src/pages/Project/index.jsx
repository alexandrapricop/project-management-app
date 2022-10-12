import { useQuery } from '@apollo/client';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { EidtProjectModal } from '../../components/EditProjectModal';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GET_PROJECT } from '../../queries/projectQuery';

export const ProjectPage = () => {
    const params = useParams();
    const projectId = params.projectId;
    const { loading, errors, data } = useQuery(GET_PROJECT, {
        variables: {id: projectId}
    });

    if(loading) 
        return (
            <LoadingSpinner />
        )
    if(errors) 
        return (
            <div>
                There's been an error
            </div>
        )
  return (
    <div className='mx-auto w-75 card p-5'>
        <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
        </Link>
        <EidtProjectModal project={data.project}/>
        <h1>
            {data.project.name}
        </h1>
        <p>
            {data.project.description}
        </p>
        <span>
            {data.project.status}
        </span>
        <span>
            {data.project?.client?.name}
        </span>
    </div>
  )
}
