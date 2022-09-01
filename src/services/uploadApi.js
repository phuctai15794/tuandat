import axiosClient from './axiosClient';

const createPreSignedURL = async (data) => {
	return await axiosClient.post('https://cbns.giang.fyi/images/presign', data);
};

const uploadByPreSignedURL = async (url, data, options) => {
	return await axiosClient.put(url, data, options);
};

const uploadPhoto = async (data) => {
	return await axiosClient.post('https://cbns.giang.fyi/sliders', data);
};

const getPhotos = async () => {
	return await axiosClient.get('https://cbns.giang.fyi/storefront/sliders');
};

const detelePhoto = async (id) => {
	return await axiosClient.delete(`https://cbns.giang.fyi/sliders/${id}`);
};

export { createPreSignedURL, uploadByPreSignedURL, uploadPhoto, getPhotos, detelePhoto };
