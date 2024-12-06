import axios from "axios";

export const integration = axios.create({
    baseURL: process.env.NEXT_PUBLIC_INTEGRATIONS_BASE_API,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})