import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from '../../mutations/clientMutations';
import { GET_CLIENTS } from '../../queries/clientQuery';

export const AddClientModal = () => {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        update(cache, {data: { addClient }}) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [...clients, addClient]
                }
            })
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if(!name || !phone || !email)
            return alert('Please fill in all fields!');

        addClient();
    }

  return (
    <>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="d-flex align-items-center">
                <FaUser className='icon'/>
                <div> Create New Client </div>
            </div>
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create New Client</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className='form-label'>
                            Name
                        </label>
                        <input className='form-control' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>
                            Phone
                        </label>
                        <input className='form-control' type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>
                            Email
                        </label>
                        <input className='form-control' type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}
