import React from 'react'
import { Stack } from '@mui/material';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { searchSongs, getSongDetail, getListeningQuestion } from '../store/actions/actionTasks'

function SongSearch() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { songs, isLoading } = useSelector((state) => state["tasks"])
  const [searchParam, setSearchParam] = useState({
    artist: "",
    title: ""
  })

  const handleChange = (e) => {
    console.log(e.target, "<<<< VALUE");
    setSearchParam({
      ...searchParam,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(searchParam);
    dispatch(searchSongs(searchParam))
  }

  const handleClick = (e, id) => {
    e.preventDefault()
    console.log(id, "<<< SONG ID");
    navigate("/create-listening-task/" + id)
  }

  useEffect(() => {
    console.log(songs, "<<< SEARCH RESULT SONGS");
  }, [handleSubmit])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <div>
        <h1>This is the Song Search Page</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label for="artist">Artist/Band Name</label>
            <input type="text" id="artist" placeholder="Coldplay" name="artist" value={searchParam.artist} onChange={handleChange} />
          </div>

          <div>
            <label for="title">Song Title</label>
            <input type="text" id="title" placeholder="Yellow" name="title" value={searchParam.title} onChange={handleChange} />
          </div>

          <div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>

        </form>
      </div>

      <div>
        <Stack>
          {songs?.map(song => (
            // <h2>{JSON.stringify(song)}</h2>
            <a href="" key={song.id} onClick={(e) => handleClick(e, song.id)}>
              <div >
                <div>
                  <img src={song?.albumArt} width="15%" height="15%" alt="Album Cover" />
                </div>

                <div>
                  {song?.title}
                </div>
              </div>
            </a>
          ))}
        </Stack>
      </div>

    </div>
  )
}

export default SongSearch
