import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'
import { EmptyState, ResourcePage } from './Activities.jsx'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems('leaderboard').then(setLeaders).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourcePage title="Leaderboard" subtitle="See who is building the strongest streak this week." error={error}>
    {leaders.length ? leaders.map((leader, index) => <article className="leader-row" key={leader._id || leader.id}><span className="rank">{leader.rank || index + 1}</span><div><strong>{leader.user?.name || leader.user?.username || 'Athlete'}</strong><span>Consistency contender</span></div><b>{leader.points || 0}<small> pts</small></b></article>) : <EmptyState text="No leaderboard entries yet." />}
  </ResourcePage>
}
export default Leaderboard