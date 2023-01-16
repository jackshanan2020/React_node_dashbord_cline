import axiosInstance from '../config/axios.config';

const URL =`/api`;

const turnaroundApi={
	getAllTurnaroundTime:()=>{
		return axiosInstance.get(`${URL}/records`);
	},
	deleteTurnaround:(recordId)=>{
		return axiosInstance.delete(`${URL}/delete-turnaround/${recordId}`);
	},
	filterTurnaround:(data)=>{
		return axiosInstance.post(`${URL}/records/filter-turnaround`,data);
	},
	updateTurnaround:(rowId, updateBody)=>{
		return axiosInstance.put(`${URL}/update-turnaround/${rowId}`,	{...updateBody});
	},

}

export default turnaroundApi;