import axiosInstance from '../config/axios.config';

const URL =`/api`;

const inventoryApi={
	getAllInventory:()=>{
		return axiosInstance.get(`${URL}/admin/products/all`);
	},
	deleteInventoryProduct:(recordId)=>{
		return axiosInstance.delete(`${URL}/delete-inventory/${recordId}`);
	},
	filterInventoryProduct:(data)=>{
		return axiosInstance.post(`${URL}/records/filter-inventory`,data);
	},
	updateInventoryProduct:(rowId, updateBody)=>{
		return axiosInstance.put(`${URL}/update-inventory/${rowId}`,{...updateBody});
	},

}

export default inventoryApi;