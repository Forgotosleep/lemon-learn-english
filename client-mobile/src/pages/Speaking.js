import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { getScore, addScore } from "../store/actions/actionScores";
import { fetchTask, setTasks } from "../store/actions/actionTasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import { alertSuccess } from "../assets/js/sweetalert2";

function SpeakingStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recordState, setRecordState] = useState(null);
  const [audioData, setAudioData] = useState();
  const [score, setScore] = useState();
  const { id: taskId } = useParams();
  const { state } = useLocation();
  const { task } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(fetchTask(taskId));
    return () => {
      dispatch(setTasks({}));
    };
  }, []);

  const submitAudio = () => {
    dispatch(getScore(audioData, task?.question))
      .then((data) => {
        setScore(data);
        sendAudio({ audioData, scoreData: data, taskId });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        navigate("/class");
        alertSuccess("your task is complete");
      });
  };

  const sendAudio = (data) => {
    dispatch(addScore(data));
  };
  const start = () => {
    setRecordState(RecordState.START);
  };
  const stop = () => {
    setRecordState(RecordState.STOP);
  };

  const onstop = (audio) => {
    setAudioData(audio);
  };

  function onClick() {
    let state = recordState === RecordState.START ? RecordState.STOP : RecordState.START;
    setRecordState(state);
  }

  return (
    <div className="container">
      <div className="card p-4">
        <h4>{task?.name}</h4>
        <p>{task?.description}</p>
        <div className="my-3">Sentence to speak</div>
        <div
          style={{
            borderRadius: "8px",
            boxShadow: "0 0 6px #777",
            padding: "10px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          <p>{task?.question}</p>
        </div>
        <div className="d-flex flex-column mt-3 mb-4 justify-content-center align-items-center">
          <AudioReactRecorder
            // backgroundColor={"rgba(0,0,0,0)"}
            canvasWidth={200}
            canvasHeight={100}
            state={recordState}
            onStop={(e) => onstop(e)}
          />
          <audio src={audioData?.url} className="mt-2" controls></audio>
        </div>
        {score ? (
          <div className="d-flex flex-row mt-3 justify-content-around">
            <button disabled className="button rounded btn-secondary mb-2 w-25" onClick={start}>
              START
            </button>
            <button disabled className="button rounded btn-warning mb-2 w-25" onClick={stop}>
              STOP
            </button>
            <button disabled className="button rounded btn-success mb-2 w-25" onClick={submitAudio}>
              SUBMIT
            </button>
          </div>
        ) : (
          <div className="d-flex flex-row mt-3 justify-content-center">
            {/* <button
              className="button rounded btn-secondary mb-2 w-25"
              onClick={start}
            >
              START
            </button>
            <button
              className="button rounded btn-warning mb-2 w-25"
              onClick={stop}
            >
              STOP
            </button> */}
            <button
              style={{
                width: "70px",
                height: "70px",
                background: "#f4133e",
                borderRadius: "2000px",
                border: "none",
                marginRight: "15px",
              }}
              onClick={onClick}
            >
              {recordState === RecordState.START ? <FontAwesomeIcon icon={faStop} color="white" size="3x"></FontAwesomeIcon> : <FontAwesomeIcon icon={faMicrophone} color="white" size="3x"></FontAwesomeIcon>}
            </button>
            <button className="btn rounded btn-success" onClick={submitAudio} style={{ width: "100px" }}>
              SUBMIT
            </button>
          </div>
        )}
      </div>
      {score ? (
        <center>
          <h5>Your score is :{score}</h5>
        </center>
      ) : (
        ""
      )}
    </div>
  );
}

export default SpeakingStudent;
