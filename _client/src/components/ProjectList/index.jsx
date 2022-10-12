import React from 'react'
import { useQuery } from "@apollo/client";
import { LoadingSpinner } from '../LoadingSpinner';
import { GET_PROJECTS } from '../../queries/projectQuery';
import { ProjectRow } from '../ProjectRow';

export const ProjectsList = () => {
    const { loading, errors, data } = useQuery(GET_PROJECTS);

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
        <div>
            <h2>Projects</h2>
            <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Name </th>
                        <th> Status </th>
                        <th> Description </th>
                        <th> Client </th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {data.projects.map(elem => (
                        <ProjectRow key={elem.id} client={elem} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
