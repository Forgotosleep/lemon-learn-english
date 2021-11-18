import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTask, fetchTasks } from "../store/actions/actionTasks";
import { alertScore, alertSuccess } from "../assets/js/sweetalert2";
import Ratings from "../components/Rating";
import { updateRating } from "../store/actions/actionClasses";
import { fetchMyClasses, updateStudentStatus } from "../store/actions/actionMyClasses";
import { getUser } from "../store/actions/actionUser";
import { brown } from "@mui/material/colors";

function StudentTask() {
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.user);
  const { myClasses, isLoading, isError } = useSelector((state) => state.myClasses);
  const { id } = useParams();
  const [countStat, setCountStat] = useState(0);
  const { state } = useLocation();
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkCompletedTask = () => {
    let temp = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].Score && tasks[i].Score.studentId == user.id) temp++;
    }
    if (temp === tasks.length) {
      return true;
    }
    return false;
  };
  const getTasks = () => {
    dispatch(fetchTasks(id));
  };

  useEffect(() => {
    dispatch(getUser());
    getTasks();
    dispatch(fetchMyClasses());
  }, []);

  const showScore = (score) => {
    alertScore(score);
  };
  const toTask = (taskId, url) => {
    dispatch(fetchTask(taskId));
    if (state?.categoryId == 2) navigate(`/speaking/${taskId}`);
    else navigate(`/listening-answer/${taskId}`, { state: { id, status: state?.status } });
  };

  const handleRate = (e, newValue) => {
    let rating = 0;
    if (e.target.value) rating = e.target.value;
    if (rating) {
      dispatch(updateStudentStatus(tasks.tasks[0]?.classId))
        .then((data) => {
          dispatch(updateRating({ rating, id }));
        })
        .then(() => {
          alertSuccess("completed this class");
          navigate("/class");
        });
    }
  };

  return (
    <>
      <div className="container fixed" style={{ color: brown[400] }}>
        <h1 className="mb-4">StudentTask</h1>

        {tasks.tasks?.length === tasks.score?.length ? <Ratings tasks={tasks?.tasks} score={tasks?.score} state={state?.status} handleRate={handleRate} /> : ""}
        <div className="row">
          {tasks.tasks?.map((task, idx) => (
            <div className="col-md-4">
              {tasks.score[idx]?.studentId === user.id ? (
                <div onClick={() => showScore(tasks.score[idx].score)} className="card p-2 mb-1 bg-light text-dark border-danger mt-4" style={{ borderRadius: 20, color: brown[400] }}>
                  <h5>{task.name}</h5>
                  <p>{task.description}</p>
                </div>
              ) : (
                <div onClick={() => toTask(task?.id, task?.soundUrl)} className="card p-2 mb-2 bg-warning text-dark border-danger mt-4" style={{ borderRadius: 20, color: brown[400] }}>
                  <h5>{task.name}</h5>
                  <p>{task.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StudentTask;
