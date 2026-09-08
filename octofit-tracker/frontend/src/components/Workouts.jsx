import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'
import { EmptyState, ResourcePage } from './Activities.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourcePage title="Workout library" subtitle="A focused plan for wherever you are today." error={error}>
    {workouts.length ? <div className="card-grid">{workouts.map((workout) => <article className="feature-card" key={workout._id || workout.id}><div className="workout-meta"><span>{workout.difficulty || 'all levels'}</span><span>{workout.durationMinutes || 0} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p>{workout.exercises?.length > 0 && <strong>{workout.exercises.length} exercises</strong>}</article>)}</div> : <EmptyState text="No workouts available yet." />}
  </ResourcePage>
}
export default Workouts