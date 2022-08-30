import axiosClient from './axiosClient';

const getPreSignURL = async (data) => {
	return await axiosClient.post('https://cbns.giang.fyi/images/presign', data);
};

export { getPreSignURL };
