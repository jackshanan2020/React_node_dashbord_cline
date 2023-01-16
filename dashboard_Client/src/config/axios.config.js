import axios from "axios";

const baseURL =process.env.NODE_ENV==='development'?`http://localhost:3030`:``;
const axiosInstance = axios.create({
	baseURL,
	withCredentials:true
	
});
axiosInstance.interceptors.response.use((response)=> {
	return response;
}, (error)=>{
	if(error.response&&error.response.status===401){
		window.location.href='/login';
	}
	return Promise.reject(error)
})
export default axiosInstance;