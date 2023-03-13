import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutForm = () => {

  const {dispatch} = useWorkoutsContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyField, setEmptyField] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, load, reps}

    const response = await fetch('https://workout-api-o076.onrender.com/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()


    if (!response.ok) {
      setError(json.error)
      setEmptyField(json.emptyField)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      dispatch({type:'CREATE_WORKOUT',payload : json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
      className={emptyField.includes('title') ? 'error' : ''}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg):</label>
      <input
      className={emptyField.includes('load') ? 'error' : ''}
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Number of Reps:</label>
      <input
      className={emptyField.includes('reps') ? 'error' : ''}
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm