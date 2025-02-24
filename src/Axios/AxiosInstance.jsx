import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "https://food.sidigaber.org/api/",
    headers: {
        Accept: "accept: application/json",
    }
})

export default AxiosInstance;