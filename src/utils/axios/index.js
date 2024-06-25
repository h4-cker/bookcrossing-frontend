import axios from "axios";
import {LOCAL} from "../../config.jsx";

export const instance = axios.create({
    baseURL: LOCAL,
    timeout: 1000,
    headers: {}
});