import Axios from "axios";

const backend_url = "http://localhost:4000";

const AxiosBase = Axios.create({
    baseURL: backend_url,
});

export default AxiosBase;
