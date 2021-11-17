import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setClasses } from "../../store/actions/actionClasses";
import { setUser } from '../../store/actions/actionUser';
import { setScore, setScores } from '../../store/actions/actionScores';
import { setTask, setTasks } from '../../store/actions/actionTasks';


function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setUser({}))
    dispatch(setClasses([]))

    dispatch(setTask({}))
    dispatch(setTasks([]))

    dispatch(setScore({}))
    dispatch(setScores([]))

    localStorage.removeItem("access_token")
    navigate('/login')
  }

  return (
    <>
      <h1>Profile teacher</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Profile;
