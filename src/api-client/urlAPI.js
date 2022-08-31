import axiosClient from './axiosClient';

const getPreSign = async (data) => {
	return await axiosClient.post('https://cbns.giang.fyi/images/presign', data);
};

export { getPreSign };
