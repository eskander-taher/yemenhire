import axios from "axios";

const baseURL =
	process.env.NODE_ENV === "production"
		? "https://yemenhire-server.vercel.app/api"
		: "http://localhost:4000/api";

const myAxios = axios.create({ baseURL });

export default myAxios;
