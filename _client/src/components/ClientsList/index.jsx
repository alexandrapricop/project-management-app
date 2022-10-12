import React from 'react'
import { useQuery } from "@apollo/client";
import { ClientRow } from '../ClientRow';
import { GET_CLIENTS } from '../../queries/clientQuery';
import { LoadingSpinner } from '../LoadingSpinner';

export const ClientsList = () => {
    const { loading, errors, data } = useQuery(GET_CLIENTS);

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
            <h2>Clients</h2>
            <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {data.clients.map(elem => (
                        <ClientRow key={elem.id} client={elem} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
