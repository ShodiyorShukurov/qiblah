import axios from "axios";

const Api = axios.create({
  baseURL: "https://server.qiblah.app/api/v1",
  headers: {
    Token: localStorage.getItem("token"),
  },
});

export default Api;
