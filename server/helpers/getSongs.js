/* SETUP */
const {
  getLyrics,
  getSong,
  searchSong,
  getAlbumArt,
  getSongById,
} = require("genius-lyrics-api");
const Lyricist = require("lyricist/node6");
const { backOff } = require("exponential-backoff");
const geniusToken = process.env.GENIUSTOKEN

const accessToken = process.env.GENIUSTOKEN; // Get this thing into a .env BEFORE DEPLOYING
const lyricist = new Lyricist(
  geniusToken
);

/* FUNCTIONS */
async function searchSongs(artist, title) {
  // This function attempts to search the database for song(s) based on its provided artist & title data. Returns an array that contains the song's Genius ID, title, albumArt image URL and its lyrics page in Genius' own website. Most useful is the song's ID.
  try {
    // console.log(artist, title);
    const options = {
      apiKey:
        geniusToken,
      title: !title ? "''" : title,
      artist: !artist ? "''" : artist,
      optimizeQuery: true,
    };
    const songs = await searchSong(options);
    return songs;
  } catch (err) {
    // console.log(err, "<<< ERR SEARCH SONGS");
    throw err;
    // INSERT ERROR HANDLER HERE
  }
}

async function getSongDetailById(id) {
  // returns an object containing the original lyrics (string), split lyrics (array), index of missing words (array) and the URL to its video/music
  try {
    const songById = await backOff(async () => {
      const { lyrics, media, title } = await lyricist.song(id, {
        fetchLyrics: true,
      });

      if (!lyrics) {
        return Promise.reject({ name: "SearchSongByIdFail" });
      }

      let splitLyrics = lyrics.split("\n");
      const song = { id, title, lyrics, media, splitLyrics };

      return song;
    });

    return songById;
  } catch (err) {
    console.log(err, "<<< ERR GET LYRICS BY ID");
    throw err;
  }
}

function convertLyricsToQuestion(song, index) {
  // This function accepts a song object (the result from getSongDetailById func) and the intentionally emptied out parts' index. Based on its index, the parts of the splitLyrics is replaced with a fixed character (underscores atm), and then returns the splitLyrics (now question) as an Array of Strings.
  // console.log(song, "<<<<");
  const { lyrics, splitLyrics, media } = song;
  let count = 0;
  // console.log(splitLyrics);
  let question = splitLyrics.map((row, i) => {
    if (i !== +index[count] || count > index.length) {
      return row;
    } else {
      count++;
      return "__________"; // this is ten underscores
    }
  });
  // const questionPacket = { question }
  return question;
}

function getListeningScore(splitLyrics, answer, index) {
  // This function accepts splitLyrics (Array of Strings), the student's answer (Array of Strings), and the missing lyric part's index (array of Number). The way it works is that the function grabs parts of splitLyrics based on the index params, splits them into each words, and compare each words to those of the answers (within the same index). A score is produced for each line, which is then averaged and rounded, then returned. Voila!
  const scores = [];
  // console.log(splitLyrics, answer);

  index.forEach((i1, i2) => {
    const trueAnswers = splitLyrics[i1]?.split(" ") || "";
    const studentAnswers = answer[i2]?.split(" ") || "";
    let correctMatch = 0;

    trueAnswers.forEach((word, index) => {
      if (studentAnswers[index] === word) {
        correctMatch++;
      }
    });

    scores.push(correctMatch / trueAnswers.length);
  });

  // console.log(scores, "<<< GET LISTEINGIN SCORE HELPER");

  let avgScore = Math.round(
    (scores.reduce((total, num) => (total += num)) / scores.length) * 100
  );

  return avgScore;
}

module.exports = {
  searchSongs,
  getSongDetailById,
  convertLyricsToQuestion,
  getListeningScore,
};
