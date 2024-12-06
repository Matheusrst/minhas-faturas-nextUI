import axios from "axios";

export const nextApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})