import { useMutation } from '@apollo/client';
import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../../mutations/clientMutations';
import { GET_CLIENTS } from '../../queries/clientQuery';

export const ClientRow = (props) => {
    const { client } = props;
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        update(cache, {data: { deleteClient }}) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: clients.filter(client => client.id !== deleteClient.id)
                }
            })
        }
    });
  return (
    <tr>
        <td> {client.id} </td>
        <td> {client.name} </td>
        <td> {client.email} </td>
        <td> {client.phone} </td>
        <td>  
            <button onClick={() => deleteClient()} className='btn btn-danger btn-sm'> 
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}