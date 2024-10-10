import axios from "axios";

const axiosBase = axios.create({
  // local instance of firebase functions
  // baseURL: "http://127.0.0.1:5001/clone-4681f/us-central1/api",
  //localhost
// baseURL: "http://127.0.0.1:5500/api",

  //deploy on render.com
    baseURL: "https://evangadi-forum-personal-work-api.onrender.com/api",
//   
});

export default axiosBase;