import {useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutsForm'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const Home = () => {

  const {workouts,dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://workout-api-o076.onrender.com/api/workouts')
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        dispatch({
          type : 'SET_WORKOUTS', payload : json
        })
      }
    }
    fetchWorkouts()
  }, [dispatch])


  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}


export default Home