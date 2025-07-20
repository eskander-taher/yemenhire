const apiBase =
	process.env.NODE_ENV === "production" ? "https://api.yemenhire.com" : "http://localhost:4000";

export default apiBase;
