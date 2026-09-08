import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'
import { EmptyState, ResourcePage } from './Activities.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems('teams').then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourcePage title="Teams" subtitle="Train together, compare progress, stay accountable." error={error}>
    {teams.length ? <div className="card-grid">{teams.map((team) => <article className="feature-card" key={team._id || team.id}><span className="card-kicker">TEAM</span><h2>{team.name}</h2><p>{team.description || 'A shared space for better habits.'}</p><strong>{team.members?.length || 0} members</strong></article>)}</div> : <EmptyState text="No teams created yet." />}
  </ResourcePage>
}
export default Teams