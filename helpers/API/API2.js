'use server';

import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_LIVE;

let baseURLocalStorage
if (typeof window !== "undefined") {
    baseURLocalStorage = localStorage.getItem("BASE_URL") || baseUrl;
}

const API2 = axios.create({
    baseURL: baseURLocalStorage, // Replace with your API2 base URL
    headers: {
        "Content-Type": "application/json",
    },
});


API2.interceptors.request.use(async (config) => {
    return config;
}, (error) => {
    return error
});

API2.interceptors.response.use(
    (response) => {

        const url = response.config.url;
        // console.log(response, 'resssssssssssssssssssssssssssss')
        return response;
    },
    (error) => {
        const url = error?.config?.url;
        return error

    }
);


export default API2;
