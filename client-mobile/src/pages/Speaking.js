import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getScore, addScore } from '../store/actions/actionScores';

function SpeakingStudent() {
  const dispatch = useDispatch()
  const [recordState, setRecordState] = useState(null)
  const [audioData, setAudioData] = useState()
  const { id: taskId } = useParams()
  const { tasks } = useSelector(state => state.tasks)
  console.log(tasks)


  const update = (audioData) => {
    dispatch(getScore(audioData))
      .then((data) => {
        sendAudio({ audioData, scoreData: data, taskId })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const sendAudio = (data) => {
    dispatch(addScore(data))
  }



  const start = () => {
    setRecordState(RecordState.START)
  }
  const stop = () => {
    setRecordState(RecordState.STOP)
  }

  const onstop = (audio) => {
    update(audio)
    setAudioData(audio.url)
  }

  return (
    <div className="App">
      <AudioReactRecorder state={recordState} onStop={(e) => onstop(e)} />
      <audio src={audioData} controls></audio>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={update}>coba</button>
    </div>
  );
}

export default SpeakingStudent;