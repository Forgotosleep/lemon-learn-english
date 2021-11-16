import { Stack } from '@mui/material';
import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ReactPlayer from "react-player"
import { getSongDetail, getListeningQuestion } from '../store/actions/actionTasks'

const CreateListeningTask = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { song, media, isLoading } = useSelector((state) => state["tasks"])
  const [choiceIndex, setChoiceIndex] = useState([])
  const splitLyrics = song?.splitLyrics

  useEffect(() => {
    dispatch(getSongDetail({ id: +id }));
  }, [dispatch]);

  console.log(song, "<<< SONG");

  const handleClick = (input) => {
    if (choiceIndex.indexOf(input) < 0) {
      setChoiceIndex([
        ...choiceIndex,
        input
      ])
    }
    else {
      choiceIndex.splice(choiceIndex.indexOf(input), 1)
    }
  }

  const submitQuestion = () => {
    let payload = {
      song,
      id: song.id,
      index: choiceIndex,
      classId: state.classId
    }
    console.log(payload, "<<< ABOUT TO BE SENT");  // For testing purpoises
    dispatch(getListeningQuestion(payload))
    navigate("/")
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <ReactPlayer
        url={media[0]?.url}
        volume={0.5}
      />

      <div>
        <h2>{song?.title}</h2>
      </div>

      <div>
        <Stack>
          {splitLyrics?.map((row, index) => (
            row ? <button key={index} onClick={() => { handleClick(index) }}>{row}</button> : <br />
          ))}
        </Stack>

      </div>

      <div>
        <button onClick={submitQuestion}>Create Task</button>
      </div>
    </div>
  );
}

export default CreateListeningTask;
