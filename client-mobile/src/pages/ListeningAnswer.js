import { Stack } from '@mui/material';
import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ReactPlayer from "react-player"
import { fetchTask, getListeningScore } from '../store/actions/actionTasks'
import { addScoreListening } from '../store/actions/actionScores'

const ListeningAnswer = () => {
  // const { id } = useParams()
  const id = 8  // Hardcoded for testing purpoises
  const { state } = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { task, media, isLoading } = useSelector((state) => state["tasks"])
  const { user } = useSelector((state) => state["user"])
  const [question, setQuestion] = useState({
    media: {},
    missingLyrics: [],
    missingIndex: []
  })
  const [answerArr, setAnswerArr] = useState([])

  useEffect(() => {
    dispatch(fetchTask(id));
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  // console.log(task, "<<< task");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answerArr];
    list[index] = value.toLowerCase();
    setAnswerArr(list);
  }

  const submitAnswer = () => {
    let answers = answerArr.filter(answer => {
      return answer !== undefined
    })

    // console.log(answers);

    let payload = {
      answer: answers,
      song: task.question.song,
      id: task.question.id,
      index: task.question.index,
    }

    // console.log(payload, "<<< PAYLOAD");

    dispatch(getListeningScore(payload))
      .then((data) => {
        // console.log(data, "<<< SCORE");
        dispatch(addScoreListening({
          score: data?.score,
          taskId: id,
          answer: JSON.stringify(answers),
        }))
      })
      .finally(() => {
        navigate("/")
      })
  }

  return (
    <div>
      <ReactPlayer
        url={task?.soundUrl}
        volume={0.5}
      />

      <h1>Test</h1>
      <h1>Test</h1>

      {/* <div>
        <h2>{song?.name}</h2>
      </div> */}

      <div>
        <Stack>
          {task?.question?.question.map((row, index) => (
            row === "__________" ? <input key={index} type="text" onChange={(e) => handleChange(e, index)} name="answer" /> : (row === "" ? (<br />) : (<div className="mt-1"> {row} </div>))
          ))}
        </Stack>
      </div>

      <div>
        <button onClick={submitAnswer}>Submit Answer</button>
      </div>
    </div>
  );
}

export default ListeningAnswer;
