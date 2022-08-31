import axiosClient from './axiosClient';

const uploadImage = async (url, data, options) => {
	return await axiosClient.put(url, data, options);
};

export { uploadImage };
