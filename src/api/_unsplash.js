import axios from "axios";

export const useAxios = _ => {
    // Create axios request
    const request = () => {
        return axios.create({
            baseURL: process.env.REACT_APP_BASE_URL
        });
    };

    return {request};
};
