import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { FaPenAlt } from 'react-icons/fa';
import { UPDATE_PROJECT } from '../../mutations/projectMutations';
import { GET_CLIENTS } from '../../queries/clientQuery';
import { GET_PROJECT } from '../../queries/projectQuery';
import { LoadingSpinner } from '../LoadingSpinner';

export const EidtProjectModal = (props) => {
    const { project } = props;
    const [description, setDescription] = useState(project.description);
    const [name, setName] = useState(project.name);
    const [status, setStatus] = useState("new");

    const { loading, errors, data } = useQuery(GET_CLIENTS);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {id: project.id, name, description, status},
        refetchQueries:[{query: GET_PROJECT, variables: {id: project.id}}]
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if(!name || !description || !status)
            return alert('Please fill in all fields!');

        updateProject();
    }

    if(loading) 
        return (
            <LoadingSpinner />
        )

  return (
    <>
        <button type="button" className="btn btn-secondary btn-sm w-25 d-inline ms-auto" data-bs-toggle="modal" data-bs-target="#projectModal">
            <div className="d-flex align-items-center">
                <FaPenAlt className='icon'/>
                <div> Edit Project </div>
            </div>
        </button>


        <div className="modal fade" id="projectModal" tabIndex="-1" role="dialog" aria-labelledby="projectModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Create New Project</h5>
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
                                Description
                            </label>
                            <textarea className='form-control' id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Status
                            </label>
                            <select className='form-select' id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="new"> Not Started </option>
                                <option value="progress"> In Progress </option>
                                <option value="completed"> Completed </option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
