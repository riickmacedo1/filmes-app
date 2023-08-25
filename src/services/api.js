import axios from "axios";

//BASE DA API: https://api.themoviedb.org/3
// URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=67c271cd643a6daa1fb5fa708a08f706

export default axios.create({ baseURL: "https://api.themoviedb.org/3/" });
