import axiosInstance from '../config/axios.config';

const URL =`/api`;

const categoryApi={
	getAllCategories:()=>{
		return axiosInstance.get(`${URL}/categories/all`);
	},


}

export default categoryApi;