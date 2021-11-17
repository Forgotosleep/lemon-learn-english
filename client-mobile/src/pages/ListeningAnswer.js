import { Stack } from '@mui/material';
import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ReactPlayer from "react-player"
import { getSongDetail, getListeningQuestion, fetchTask } from '../store/actions/actionTasks'

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

  // const splitLyrics = song?.splitLyrics

  useEffect(() => {
    dispatch(fetchTask(id));
    // const { index, song, question } = JSON.parse(task?.question)
    // setQuestion({
    //   media: song.media,
    //   missingLyrics: question
    // })
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>
  }


  // console.log(task, "<<< task");

  const handleChange = (e, index) => {
    // console.log(index, "<<<< index");
    // console.log(e.target.name, "<<<< name");
    // console.log(e.target.value, "<<<< VALUE");

    const { name, value } = e.target;
    const list = [...answerArr];
    list[index] = value.toLowerCase();
    setAnswerArr(list);
    // console.log(answerArr, "<<<");
  }

  const handleClick = (input) => {

  }

  const submitAnswer = () => {
    let answers = answerArr.filter(answer => {
      return answer !== undefined
    })

    console.log(answers);





    // let payload = {
    //   song,
    //   id: song.id,
    //   index: choiceIndex,
    //   classId: state.classId
    // }
    // console.log(payload, "<<< ABOUT TO BE SENT");  // For testing purpoises
    // dispatch(getListeningQuestion(payload))
    // navigate("/")
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
