import axios from "axios";

export default axios.create({
  baseURL: "https://dummyapi.online/api/movies",
});
