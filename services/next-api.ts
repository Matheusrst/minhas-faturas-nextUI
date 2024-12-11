import axios from "axios";

export const nextApi = axios.create({
    baseURL: `/api`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})