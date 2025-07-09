import axios from "axios";

const myAxios = axios.create({ url: "http://localhost:5000/api" });

export default myAxios;
