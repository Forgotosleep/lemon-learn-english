import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:4001",
});

export default server;
