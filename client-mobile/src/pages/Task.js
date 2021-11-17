import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchTasks } from '../store/actions/actionTasks'
import { alertSuccess } from '../assets/js/sweetalert2'
import Ratings from '../components/Rating'
import { updateRating } from '../store/actions/actionClasses'
import { updateStudentStatus } from '../store/actions/actionMyClasses'

function StudentTask() {
  const { tasks } = useSelector(state => state.tasks)
  const { user } = useSelector(state => state.user)
  const { id } = useParams()
  const { state } = useLocation()
  const [completed, setCompleted] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const checkCompletedTask = () => {
    let temp = 0
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].Score && tasks[i].Score.studentId == user.id) temp++
    }
    if (temp === tasks.length) {
      return true
    }
    return false
  }
  const getTasks = () => {
    dispatch(fetchTasks(id))
  }

  useEffect(() => {
    getTasks()
  }, [])

  const showScore = (score) => {
    alertSuccess(score)
  }
  const toTask = (id, url) => {
    if (!url) navigate(`/speaking/${id}`)
  }

  const handleRate = (e, newValue) => {
    let rating = 0
    if (e.target.value) rating = e.target.value
    if (rating) {
      dispatch(updateStudentStatus(tasks[0]?.classId))
        .then((data) => {
          dispatch(updateRating({ rating, id }))
        })

    }
  }

  return (
    <>
      <div className="container">
        <h1 className="mb-4">StudentTask</h1>
        {
          checkCompletedTask() ? <Ratings status={state.status} handleRate={handleRate} /> : ''
        }
        {
          tasks.map(task => (
            task.Score && task.Score.studentId == user.id ?
              (
                <div onClick={() => showScore(task?.Score.score)} className="card p-2 mb-2 bg-light text-dark border-danger" style={{ borderRadius: 20 }}>
                  <h5>{task.name}</h5>
                  <p>{task.description}</p>
                </div>
              ) :
              (
                <div onClick={() => toTask(task.id, task.soundUrl)} className="card p-2 mb-2 bg-warning text-dark border-danger" style={{ borderRadius: 20 }}>
                  <h5>{task.name}</h5>
                  <p>{task.description}</p>
                </div>
              )
          ))
        }


      </div>

    </>
  );
}

export default StudentTask;
