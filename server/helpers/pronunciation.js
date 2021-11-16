var axios = require("axios").default;

const getScore = async (file, task) => {
  try {
    const base64 = file.buffer.toString("base64");
    const response = await axios({
      method: "POST",
      url: "https://pronunciation-assessment1.p.rapidapi.com/pronunciation",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "pronunciation-assessment1.p.rapidapi.com",
        "x-rapidapi-key": "d629ea3015msh4bb89c7a93a2a1bp142119jsnd2acbbe1de47",
      },
      data: {
        audio_base64: base64,
        audio_format: "wav",
<<<<<<< HEAD
        text: task, //"Try the new cross-platform PowerShell",
=======
        text: task.toLowerCase(),
>>>>>>> upstream/development
      },
    });
    return response.data.score;
  } catch (err) {
    throw err;
  }
};

module.exports = getScore;
