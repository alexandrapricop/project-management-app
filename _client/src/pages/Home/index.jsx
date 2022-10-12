import React from 'react'
import { AddClientModal } from '../../components/AddClientModal'
import { AddProjectModal } from '../../components/AddProjectModal'
import { ClientsList } from '../../components/ClientsList'
import { ProjectsList } from '../../components/ProjectList'

export const HomePage = () => {
  return (
    <div className="container">
        <ClientsList />
        <AddClientModal />
        <ProjectsList />
        <AddProjectModal />
    </div>
  )
}
