const { Op } = require("sequelize");

const { Task, Class, Score } = require("../models");
const { initRedis } = require("../helpers/redis");
const redis = initRedis();
// const Redis = require("ioredis");

const {
  searchSongs,
  getSongDetailById,
  convertLyricsToQuestion,
  getListeningScore,
} = require("../helpers/getSongs");

class TaskController {
  static async create(req, res, next) {
    try {
      const { name, description, question, soundUrl, classId } = req.body;
      const input = { name, description, question, soundUrl, classId };

      const result = await Task.create(input);

      res.status(201).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async get(req, res, next) {
    try {
      const { classId } = req.query;

      let opt = { where: {} };
      if (classId) {
        opt.where.classId = classId;
      }

      const tasks = await Task.findAll(opt);

      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  }

  static async getTaskByClass(req, res, next) {
    try {
      const { classId } = req.params;

      const studentId = req.user.id;

      if (!Number(classId)) throw { name: "InvalidMaterialId" };
      const classData = await Class.findByPk(classId);
      if (!classData) throw { name: "ClassNotFound", id: classId };
      const resp = await Task.findAll({
        where: {
          classId,
        },
        include: {
          model: Score,
        },
        distinct: true,
      });
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    const id = req.params.id;
    try {
      const task = await Task.findByPk(id);

      if (!task) {
        throw { name: "TaskNotFound", id };
      }

      // if (task.soundUrl) {
      //   // console.log("xddd", task.question);
      //   task.question = JSON.parse(task.question);
      // }

      res.status(200).json(task);
    } catch (err) {
      console.log("xderror", err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      // const task = await Task.findByPk(id);

      await Task.destroy({ where: { id } });

      res.status(200).json({ message: `Deleted task with ID ${id}` });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const { name, description, question, soundUrl, classId } = req.body;
      const input = { name, description, question, soundUrl, classId };

      const result = await Task.update(input, {
        where: { id },
        returning: true,
      });

      res
        .status(200)
        .json({ result: result[1][0], message: `Task with ID ${id} Updated` });
    } catch (err) {
      next(err);
    }
  }

  static async searchSong(req, res, next) {
    try {
      const { artist, title } = req.query;
      const songs = await searchSongs(artist, title);
      res.status(200).json(songs);
    } catch (err) {
      next(err);
    }
  }

  static async getSongDetails(req, res, next) {
    try {
      const { songId } = req.params;
      const checkCache = await redis.get(songId);
      // console.log(checkCache, "<<<");
      if (checkCache) {
        const cachedSong = JSON.parse(checkCache);
        if (cachedSong.id == songId) {
          res.status(200).json(cachedSong);
          return;
        }
      }

      const songDetail = await getSongDetailById(songId);
      redis.set(songId, JSON.stringify(songDetail));

      res.status(200).json(songDetail);
    } catch (err) {
      next(err);
    }
  }

  static async getQuestion(req, res, next) {
    try {
      const { id, song, index, classId } = req.body;
      // console.log(req.body, "<<< BODY");
      const checkCache = await redis.get(id);
      if (checkCache) {
        // console.log("GOT CACHE");
        const cachedSong = JSON.parse(checkCache);
        if (cachedSong.id == id) {
          const question = convertLyricsToQuestion(cachedSong, index);
          const payload = {
            name: song.title,
            description: "listening",
            classId,
            soundUrl: song.media[0].url,
            question: JSON.stringify({ index, id, song, question }),
          };
          const result = await Task.create(payload);
          res.status(200).json({ result });
        }
      } else {
        // console.log("NOT GOT CACHE");
        const question = convertLyricsToQuestion(song, index);
        const payload = {
          name: song.title,
          description: "listening",
          classId,
          soundUrl: song.media[0].url,
          question: JSON.stringify({ index, id, song, question }),
        };
        const result = await Task.create(payload);
        res.status(200).json({ result });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getListeningScore(req, res, next) {
    // Still uses Redis to transport the 'song' atm
    try {
      const { answer, index, id, song } = req.body;
      const checkCache = await redis.get(id);
      if (checkCache) {
        const cachedSong = JSON.parse(checkCache);
        if (cachedSong.id == id) {
          const { splitLyrics } = cachedSong; //JSON.parse(cachedSong);
          const score = getListeningScore(splitLyrics, answer, index);
          res.status(200).json({ score });
        }
      } else {
        const { splitLyrics } = song;
        const score = getListeningScore(splitLyrics, answer, index);
        res.status(200).json({ score });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
