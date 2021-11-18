import { Stack } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { fetchTask, getListeningScore, setTask } from "../store/actions/actionTasks";
import { addScoreListening } from "../store/actions/actionScores";
import "../assets/css/App.css";
import { brown } from "@mui/material/colors";
import { alertSuccess } from "../assets/js/sweetalert2";

const ListeningAnswer = () => {
  const { id } = useParams(); // Hardcoded for testing purpoises
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task, media, isLoading } = useSelector((state) => state["tasks"]);

  const { user } = useSelector((state) => state["user"]);
  const [question, setQuestion] = useState({
    media: {},
    missingLyrics: [],
    missingIndex: [],
  });
  const [disabledInput, setDisabledInput] = useState(false);
  const [answerArr, setAnswerArr] = useState([]);
  const [score, setScore] = useState();
  useEffect(() => {
    dispatch(fetchTask(id));
    return () => {
      dispatch(setTask({}));
    };
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // console.log(task, "<<< task");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answerArr];
    list[index] = value.toLowerCase();
    setAnswerArr(list);
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    let answers = answerArr.filter((answer) => {
      return answer !== undefined;
    });
    let payload = {
      answer: answers,
      song: task.question.song,
      id: task.question.id,
      index: task.question.index,
    };
    dispatch(getListeningScore(payload))
      .then((data) => {
        setScore(data.score);
        setDisabledInput(true);
        dispatch(
          addScoreListening({
            score: data?.score,
            taskId: id,
            answer: JSON.stringify(answers),
          })
        );
      })
      .finally(() => {
        navigate("/tasks/" + state?.id, { state: { status: state?.status } });
        alertSuccess("Your task is complete");
      });
  };

  return (
    <div>
      {score || score == 0 ? <h5>Your Score Is: {score}</h5> : ""}
      <div className="player-wrapper">
        <ReactPlayer url={task?.soundUrl} className="react-player" playing width="100%" height="100%" />
      </div>

      {/* <div>
        <h2>{song?.name}</h2>
      </div> */}

      <div align="center">
        <div className="col-md-12">
          <div
            className="card"
            style={{
              color: brown[400],
            }}
          >
            <div className="card-body">
              <Stack>
                {task?.question?.question.map((row, index) =>
                  row === "__________" ? (
                    <div align="center">
                      <div className="form-group col-md-4">
                        <input key={index} type="text" className="form-control" onChange={(e) => handleChange(e, index)} name="answer" placeholder=".......input your answer here" />
                      </div>
                    </div>
                  ) : row === "" ? (
                    <br />
                  ) : (
                    <div className="mt-1"> {row} </div>
                  )
                )}
              </Stack>
            </div>
          </div>
        </div>
        <div className="mt-3 mb-2">
          {!disabledInput ? (
            <a className="btn btn-success" onClick={submitAnswer}>
              Submit Answer
            </a>
          ) : (
            <a className="btn btn-success">Submitted</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListeningAnswer;
