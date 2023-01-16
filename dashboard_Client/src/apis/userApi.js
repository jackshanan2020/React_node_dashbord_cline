 import axios from '../config/axios.config';

//---------------------------------------------------------
const URL = `/api/users`;
 const userApi={
 	register:(newUser)=>{
 		 return axios.post(`/api/signup`, newUser);
 	},
 	login:(email, password)=>{
 		return axios.post(`/api/admin/signin`,{email, password});
 	},
	authUserState:(user)=>{
		return axios.post(`/api/admin/user/verify`,{user});
	},
 	logout: () => {
  		 return axios.post(`/api/admin/logout`);
    },
    getAllUsers: () => {
    	return axios.get(`/api/admin/users`);
    },
    editUserDetail:(uid, user)=>{
    	return axios.put(`/api/admin/user/${uid}`,user);
    },
    deleteUser: (userId) => {
    	return axios.delete(`/api/admin/user/${userId}`);
    },
    lockUser: (userId) => {
   		return axios.patch(`${URL}/lock-user/${userId}`);
    },
  	unlockUser: (userId) => {
  		return axios.patch(`${URL}/unlock-user/${userId}`);
    },
 }

 export default userApi;