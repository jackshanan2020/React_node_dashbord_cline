import axios from '../config/axios.config';

const dashboardCountApi = {
	countInsights: () => {
		return axios.get('/api/insights');
	},
};
export default dashboardCountApi;
