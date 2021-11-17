import { Stack } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { getSongDetail, getListeningQuestion } from "../store/actions/actionTasks";
import "../assets/css/App.css";
import { brown } from "@mui/material/colors";
import { Button } from "react-bootstrap";
import { alertError, alertErrorClick, alertSure } from "../assets/js/sweetalert2";

const CreateListeningTask = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { song, media, isLoading } = useSelector((state) => state["tasks"]);
  const [choiceIndex, setChoiceIndex] = useState([]);
  const splitLyrics = song?.splitLyrics;
  const [cekMedia, setCekMedia] = useState(false);
  const [soundUrl, setSoundUrl] = useState("");
  useEffect(() => {
    dispatch(getSongDetail({ id: +id }));
  }, [dispatch]);

  useEffect(() => {
    if (!media.length) {
      setCekMedia(true);
    } else {
      setCekMedia(false);
    }
  }, [media]);

  useEffect(() => {
    if (!isLoading) {
      if (cekMedia) {
        alertError("This song doesn't have a valid playback URL, please add one manually");
      }
    }
  }, [cekMedia]);

  const handleChange = (e) => {
    setSoundUrl(e.target.value);
  };

  const handleClick = (input) => {
    if (choiceIndex.indexOf(input) < 0) {
      setChoiceIndex([...choiceIndex, input]);
    } else {
      choiceIndex.splice(choiceIndex.indexOf(input), 1);
      setChoiceIndex([...choiceIndex]);
    }
  };

  const submitQuestion = async () => {
    let payload = {
      song,
      id: song.id,
      index: choiceIndex,
      classId: state.classId,
    };

    if (cekMedia) {
      if (soundUrl === "") {
        alertError("This song doesn't have a valid playback URL, please add one manually");
      } else {
        payload.song.media = [{ url: soundUrl }];
        const result = await alertSure();
        if (result.value) {
          console.log(payload);
          dispatch(getListeningQuestion(payload));
          setSoundUrl("");
          navigate("/");
        }
      }
    } else {
      const result = await alertSure();
      if (result.value) {
        dispatch(getListeningQuestion(payload));
        setSoundUrl("");
        navigate("/");
      }
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {media.length > 0 ? (
        <>
          <div className="player-wrapper">
            <ReactPlayer url={media[0]?.url} className="react-player" playing width="100%" height="100%" />
          </div>
          <div>
            <h2
              style={{
                color: brown[400],
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              {song?.title}
            </h2>
          </div>
        </>
      ) : (
        <>
          <div align="center">
            <h2
              style={{
                color: brown[400],
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              {song?.title}
            </h2>
          </div>
          <div align="center">
            <div className="form-group col-md-6 mb-3">
              <label
                style={{
                  color: brown[400],
                }}
              >
                Sound Url
              </label>
              <input className="form-control" onChange={handleChange} name="soundurl" />
            </div>
          </div>
        </>
      )}

      <div>
        <div className="card">
          <div className="card-body" style={{ backgroundColor: brown[50] }}>
            <div align="center">
              <div className="col-md-8">
                <div className="col-md-5">
                  <div className="d-grid gap-2">
                    <Button size="lg" variant="warning" onClick={submitQuestion}>
                      Create Task
                    </Button>
                  </div>
                </div>
                {choiceIndex.length ? (
                  <>
                    <div align="center">
                      <h5
                        style={{
                          color: brown[400],
                          marginTop: "2rem",
                          marginBottom: "2rem",
                        }}
                      >
                        Your Choice
                      </h5>
                    </div>
                    {choiceIndex.map((el, index) => (
                      <>
                        {splitLyrics[el] ? (
                          <div className="d-grid gap-2" key={index}>
                            <Button
                              className="mt-2"
                              variant="outline-danger"
                              onClick={() => {
                                handleClick(el);
                              }}
                            >
                              {index + 1}. {splitLyrics[el]}
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ))}

                    <hr />
                  </>
                ) : (
                  ""
                )}
                <div align="center">
                  <h5
                    style={{
                      color: brown[400],
                      marginTop: "2rem",
                      marginBottom: "2rem",
                    }}
                  >
                    Press on the lyrics to designate as your questions (you can choose more than one)
                  </h5>
                </div>
                {splitLyrics?.map((row, index) =>
                  row ? (
                    <>
                      {choiceIndex.includes(index) ? (
                        ""
                      ) : (
                        <div className="d-grid gap-2" key={index}>
                          <Button
                            className="mt-2"
                            variant="outline-dark"
                            onClick={() => {
                              handleClick(index);
                            }}
                          >
                            {row}
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <br />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListeningTask;
