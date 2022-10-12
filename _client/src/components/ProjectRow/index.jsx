import { useMutation } from '@apollo/client';
import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from '../../mutations/projectMutations';
import { GET_PROJECTS } from '../../queries/projectQuery';

export const ProjectRow = (props) => {
    const { client } = props;
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {id: client.id},
        update(cache, {data: { deleteProject }}) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: projects.filter(client => client.id !== deleteProject.id)
                }
            })
        }
    });
  return (
    <tr>
        <td> {client.id} </td>
        <td> {client.name} </td>
        <td> {client.status} </td>
        <td> {client.description} </td>
        <td> {client?.client?.name} </td>
        <td>  
            <a href={`/project/${client.id}`} className='btn btn-secondary btn-sm'> 
                View
            </a>
        </td>
        <td>  
            <button onClick={() => deleteProject()} className='btn btn-danger btn-sm'> 
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}
