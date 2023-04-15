import axios from "axios";

export const useAxios = _ => {
    // Create axios request
    const request = () => {
        return axios.create({
            baseURL: process.env.BASE_URL
        });
    };

    return {request};
};
