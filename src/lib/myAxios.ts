import axios from "axios";

const baseURL =
	process.env.NODE_ENV === "production"
		? "https://api.yemenhire.com/api"
		: "http://localhost:4000/api";

const myAxios = axios.create({ baseURL });

export default myAxios;
