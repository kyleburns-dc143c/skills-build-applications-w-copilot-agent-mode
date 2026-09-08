import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'
import { EmptyState, ResourcePage } from './Activities.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems('users').then(setUsers).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourcePage title="Athletes" subtitle="Your community, all in one place." error={error}>
    {users.length ? <div className="card-grid">{users.map((user) => <article className="feature-card user-card" key={user._id || user.id}><div className="avatar">{(user.name || user.username || '?').charAt(0).toUpperCase()}</div><div><h2>{user.name || user.username}</h2><p>@{user.username}</p></div></article>)}</div> : <EmptyState text="No athletes joined yet." />}
  </ResourcePage>
}
export default Users