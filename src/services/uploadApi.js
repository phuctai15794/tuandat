import axiosClient from './axiosClient';

const createPreSignedURL = async (data) => {
	return await axiosClient.post('/images/presign', data);
};

const uploadByPreSignedURL = async (url, data, options) => {
	return await axiosClient.put(url, data, options);
};

const uploadPhoto = async (data) => {
	return await axiosClient.post('/sliders', data);
};

const getPhotos = async () => {
	return await axiosClient.get('/storefront/sliders');
};

const detelePhoto = async (id) => {
	return await axiosClient.delete(`/sliders/${id}`);
};

export { createPreSignedURL, uploadByPreSignedURL, uploadPhoto, getPhotos, detelePhoto };
