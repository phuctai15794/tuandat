import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'https://cbns.giang.fyi'
});

export default axiosClient;
