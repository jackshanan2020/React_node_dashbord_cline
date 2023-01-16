import axiosInstance from '../config/axios.config';

const url = `/api`
const brandApi = {
    fetchBrands:()=>{
        return axiosInstance.get(`${url}/admin/brands/all`)
    },
}
export default brandApi;