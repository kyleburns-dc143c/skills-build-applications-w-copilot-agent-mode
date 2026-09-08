import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <ResourcePage title="Recent activity" subtitle="Keep every effort visible and moving forward." error={error}>
      {activities.length ? activities.map((activity) => (
        <article className="data-row" key={activity._id || activity.id}>
          <div><strong>{activity.type || 'Workout'}</strong><span>{activity.user?.name || activity.user?.username || 'Athlete'}</span></div>
          <div className="row-stat">{activity.durationMinutes || 0} min</div>
          <div className="row-points">+{activity.points || 0} pts</div>
        </article>
      )) : <EmptyState text="No activity recorded yet." />}
    </ResourcePage>
  )
}

export function ResourcePage({ title, subtitle, error, children }) {
  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">OCTOFIT TRACKER</p><h1>{title}</h1><p>{subtitle}</p></div></div>{error && <p className="error-message">{error}</p>}<div className="data-list">{children}</div></section>
}

export function EmptyState({ text }) { return <p className="empty-state">{text}</p> }

export default Activities