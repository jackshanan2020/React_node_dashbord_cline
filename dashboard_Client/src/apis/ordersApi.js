import axiosInstance from '../config/axios.config';

const url = `/api`;

const ordersApi={
    fetchOrders:()=>{
        return axiosInstance.get(`${url}/orders/all`);
    }
}
export default ordersApi;