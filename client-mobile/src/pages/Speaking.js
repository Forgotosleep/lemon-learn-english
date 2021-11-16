import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getScore, addScore } from '../store/actions/actionScores';
import { fetchTask } from '../store/actions/actionTasks';

function SpeakingStudent() {
  const dispatch = useDispatch()
  const [recordState, setRecordState] = useState(null)
  const [audioData, setAudioData] = useState()
  const { id: taskId } = useParams()
  const { task } = useSelector(state => state.tasks)
  useEffect(() => {
    dispatch(fetchTask(taskId))
  }, [])

  const submitAudio = () => {
    dispatch(getScore(audioData, task?.question))
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
    setAudioData(audio)
  }

  return (
    <div className="container">
      <div className="card">
        <h4>{task?.name}</h4>
        <h5>{task?.description}</h5>
        <p>{task?.question}</p>
        <AudioReactRecorder canvasWidth={300} canvasHeight={200} state={recordState} onStop={(e) => onstop(e)} />
        <audio src={audioData?.url} controls></audio>
        <div className="d-flex flex-row mt-3 justify-content-around">
          <button className="button rounded btn-secondary mb-2 w-25" onClick={start}>START</button>
          <button className="button rounded btn-warning mb-2 w-25" onClick={stop}>STOP</button>
          <button className="button rounded btn-success mb-2 w-25" onClick={submitAudio}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default SpeakingStudent;