import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
    responseType: "json",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});