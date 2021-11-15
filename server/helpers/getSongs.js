/* SETUP */
const { getLyrics, getSong, searchSong, getAlbumArt, getSongById } = require('genius-lyrics-api')
const Lyricist = require('lyricist/node6');
const { backOff } = require("exponential-backoff")
const accessToken = 'Emmh0nWJW5bLOM7upFEGZHuabVmKQZQGX683zYuWhQLpHtW4BitKMv8xa8eb-IoQ'  // Get this thing into a .env BEFORE DEPLOYING
const lyricist = new Lyricist(accessToken);


/* FUNCTIONS */
async function searchSongs(artist, title) {
  // This function attempts to search the database for song(s) based on its provided artist & title data. Returns an array that contains the song's Genius ID, title, albumArt image URL and its lyrics page in Genius' own website. Most useful is the song's ID.
  try {
    const options = {
      apiKey: accessToken,
      title: !req.body?.title ? "''" : req.body.title,
      artist: !req.body?.artist ? "''" : req.body.artist,
      optimizeQuery: true
    };

    const songs = await searchSong(options)
    return songs

  } catch (err) {
    console.log(err, "<<< ERR SEARCH SONGS");
    next(err)
    // INSERT ERROR HANDLER HERE
  }
}

async function getSongDetailById(id) {  // returns an object containing the original lyrics (string), split lyrics (array), index of missing words (array) and the URL to its video/music
  try {
    const lyrics = await backOff(async () => {
      const { lyrics, media } = await lyricist.song(id, { fetchLyrics: true });
      // console.log(media);
      if (!lyrics) {
        return Promise.reject()
      }

      let splitLyrics = lyrics.split('\n')

      const song = { lyrics, media, splitLyrics }

      redis.set(id, song)
      return song
    });

  } catch (err) {
    console.log(err, "<<< ERR GET LYRICS BY ID");
    next(err)
  }
}

function convertLyricsToQuestion(song, index) {
  const { lyrics, splitLyrics, media } = song
  let count = 0
  let question = splitLyrics.map((row, i) => {
    if (i !== index[count] || count > index.length) {
      return row
    }
    else {
      count++
      return '__________'  // this is ten underscores
    }
  })
  // const questionPacket = { question }
  return question
}

function getListeningScore(splitLyrics, answer, index) {
  const scores = []

  index.forEach((i1, i2) => {
    const trueAnswers = splitLyrics[i1].split(" ")
    const studentAnswers = answer[i2].split(" ")
    let correctMatch = 0

    trueAnswers.forEach((word, index) => {
      if (studentAnswers[index] === word) {
        correctMatch++
      }
    });

    scores.push(correctMatch / trueAnswers.length)
  });

  let avgScore = (scores.reduce((total, num) => total += num)) / scores.length
  return avgScore
}

module.exports = { searchSongs, getSongDetailById, convertLyricsToQuestion }