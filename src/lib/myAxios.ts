import axios from "axios";

const baseURL =
	process.env.NODE_ENV === "production"
		? "http://185.198.152.113:4000/api"
		: "http://localhost:4000/api";

const myAxios = axios.create({ baseURL });

export default myAxios;
