import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchTasks } from '../store/actions/actionTasks'
function StudentTask() {
  const { tasks } = useSelector(state => state.tasks)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getTasks = () => {
    dispatch(fetchTasks(id))
  }

  useEffect(() => {
    getTasks()
  }, [])

  const toTask = (id, url) => {
    if (!url) navigate(`/speaking/${id}`)
  }
  return (
    <>
      <div className="container">
        <h1 className="mb-4">StudentTask</h1>
        {
          tasks.map(task => (
            <div onClick={() => toTask(task.id, task.soundUrl)} className="card p-2 mb-2 bg-warning text-white border-danger" style={{ borderRadius: 20 }}>
              <h5>{task.name}</h5>
              <p>{task.description}</p>
            </div>
          ))
        }


      </div>

    </>
  );
}

export default StudentTask;
