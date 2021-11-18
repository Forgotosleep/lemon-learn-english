import React from "react";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { searchSongs, getSongDetail, getListeningQuestion } from "../store/actions/actionTasks";
import { Row, Col, Container, Card, CardGroup } from "react-bootstrap";
import { brown } from "@mui/material/colors";

function SongSearch() {
  const { state } = useLocation();
  const { classId } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songs, isLoading } = useSelector((state) => state["tasks"]);
  const [searchParam, setSearchParam] = useState({
    artist: "",
    title: "",
  });

  const handleChange = (e) => {
    console.log(e.target, "<<<< VALUE");
    setSearchParam({
      ...searchParam,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchParam);
    dispatch(searchSongs(searchParam));
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    console.log(id, "<<< SONG ID");
    navigate("/create-listening-task/" + id, {
      state: { classId },
    });
  };

  useEffect(() => {
    console.log(songs, "<<< SEARCH RESULT SONGS");
  }, [handleSubmit]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container
      style={{
        color: brown[400],
      }}
    >
      <div>
        <h1>Search Song</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="artist">Artist/Band Name</label>

            <input type="text" id="artist" className="form-control" placeholder="Coldplay" name="artist" value={searchParam.artist} onChange={handleChange} />
          </div>

          <div className="form-group col-md-6">
            <label for="title">Song Title</label>
            <input className="form-control" type="text" id="title" placeholder="Yellow" name="title" value={searchParam.title} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" class="btn btn-outline-primary mt-3">
          Search
        </button>
      </form>

      <Row className="g-4 mb-3 mt-3">
        {songs?.map((song) => (
          <Col>
            <a
              href=""
              style={{
                color: brown[400],
                textDecoration: "none",
              }}
              key={song.id}
              onClick={(e) => handleClick(e, song.id)}
            >
              <Card style={{ width: "18rem", height: "25rem" }}>
                <Card.Img variant="top" src={song?.albumArt} />
                <Card.Body>
                  <Card.Text>{song?.title}</Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>

          // <h2>{JSON.stringify(song)}</h2>
          // <a href="" key={song.id} onClick={(e) => handleClick(e, song.id)}>
          //   <div>
          //     <div>
          //       <img src={song?.albumArt} width="15%" height="15%" alt="Album Cover" />
          //     </div>

          //     <div>{song?.title}</div>
          //   </div>
          // </a>
        ))}
      </Row>
    </Container>
  );
}

export default SongSearch;
