const Redis = require("ioredis");
let redis;
let isStarted = false;

function initRedis() {
  if (!isStarted) {
    redis = new Redis();
    isStarted = true;
  }
  return redis;
}

function closeRedis() {
  if (isStarted) {
    redis.disconnect();
    isStarted = false;
  }
}

module.exports = { redis, initRedis, closeRedis };
