import axios from "axios";
const apiServer = axios.create({
    baseURL: 'http://localhost:8085/api/'
});

export default apiServer