import React, { useEffect, useMemo, useCallback, useState } from 'react';
import Image from 'next/future/image';
import {
	AppBar,
	Container,
	Toolbar,
	Paper,
	Typography,
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Snackbar,
	Alert,
	Box,
	Backdrop,
	CircularProgress
} from '@mui/material';
import { Clear, Save, AddPhotoAlternate } from '@mui/icons-material';
import { createPreSignedURL, uploadByPreSignedURL, uploadPhoto, getPhotos, detelePhoto } from '~/services';
import config from '~/config';
import images from '~/assets/images';
import { SliderList, SliderPreview } from '~/components/Slider';

const buttonStyle = {
	fontWeight: '500',
	textTransform: 'inherit',
	paddingY: '0.5rem'
};

export default function Home() {
	const sliderTypes = useMemo(() => config.slider.positions, []);
	const defaultType = sliderTypes[0].id || '';

	const [photoInputs, setPhotoInputs] = useState([]);
	const [photoList, setPhotoList] = useState([]);
	const [isFetch, setIsFetch] = useState(true);
	const [type, setType] = useState(defaultType);
	const [errorText, setErrorText] = useState('');
	const [errorField, setErrorField] = useState('');
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [openBackdrop, setOpenBackdrop] = useState(false);

	useEffect(() => {
		return () => {
			if (photoInputs.length) {
				photoInputs.forEach((photo) => URL.revokeObjectURL(photo.preview));
			}
		};
	}, [photoInputs]);

	useEffect(() => {
		if (isFetch) {
			(async () => {
				const response = await getPhotos();
				setPhotoList(response.data);
				setIsFetch(false);
			})();
		}
	}, [isFetch]);

	const handleChangeFile = async (e) => {
		const { files } = e.target;
		let photosData = [];
		let photosExceedSize = [];
		let photosInvalidExt = [];
		let message = [];
		let isError = false;
		const filesLength = (files && files.length) || 0;

		if (filesLength) {
			if (filesLength > config.slider.limit.max) {
				isError = true;
				message.push(`Max only ${config.slider.limit.max} files are allowed`);
			}

			Object.entries(files)
				.slice(0, config.slider.limit.max)
				.map((item) => {
					const [, file] = item;
					const fileSize = file.size / 1024 / 1024;
					const fileExt = file.name.split('.').pop();

					if (!config.slider.extensions.includes(fileExt)) {
						photosInvalidExt.push(file);
					} else if (fileSize > config.slider.limit.size) {
						photosExceedSize.push(file);
					} else {
						file.preview = URL.createObjectURL(file);
						photosData.push(file);
					}
				});

			if (photosInvalidExt.length) {
				isError = true;
				message.push(`Some files is invalid (Allow: ${config.slider.extensions.join(', ')})`);
			}

			if (photosExceedSize.length) {
				isError = true;
				message.push(`Some files exceed the allowable size (Allow: ${config.slider.limit.size} MB)`);
			}

			if (isError) {
				setOpenSnackBar(isError);
				setErrorText(message.join('\r\n'));
			}

			if (photosData.length) {
				setPhotoInputs(photosData);
			}
		}

		e.target.value = null;
	};

	const handleChangeType = (e) => {
		const value = e.target.value;
		setType(value);
	};

	const handleDeletePhotoInput = useCallback(
		(item) => {
			const newPhotos = photoInputs.filter((photo) => photo.name !== item.name);
			setPhotoInputs(newPhotos);
		},
		[photoInputs]
	);

	const handleDeletePhoto = useCallback(async (id) => {
		if (id) {
			await detelePhoto(id);
			setIsFetch(true);
		}
	}, []);

	const handleSave = async () => {
		setOpenBackdrop(true);

		if (photoInputs.length === 0) {
			setErrorText('Please choose a photo');
			setOpenSnackBar(true);
		} else if (type === '') {
			setErrorField('type');
			setErrorText('Please choose a type');
			setOpenSnackBar(true);
		} else {
			await Promise.all(
				photoInputs.map((photo) =>
					createPreSignedURL({
						file_name: photo.name,
						content_type: photo.type
					})
				)
			)
				.then(function (data) {
					const presignURLs = (data && data.map((item) => decodeURIComponent(item.data.presign_url))) || null;

					if (presignURLs) {
						return Promise.all(
							photoInputs.map((photo, index) => {
								const presignURL = presignURLs[index];

								return uploadByPreSignedURL(presignURL, photo, {
									headers: {
										'Content-Type': photo.type,
										'X-Amz-Acl': 'public-read'
									}
								});
							})
						)
							.then(function (data) {
								return Promise.all(
									data.map((item, index) => {
										const presignURL = presignURLs[index];

										if (item.status === 200) {
											const imagePath = presignURL.split('?')[0] || '';

											if (imagePath !== '') {
												return uploadPhoto({
													image_url: imagePath,
													position: type
												});
											}
										}
									})
								);
							})
							.catch(function (error) {
								console.log('Error Upload By PreSigned URL:', error);
							});
					}
				})
				.then(async function (data) {
					if (data) {
						setIsFetch(true);
						handleClear();
					}
				})
				.catch(function (error) {
					console.log('Error Get PreSigned URL:', error);
				});
		}

		setOpenBackdrop(false);
	};

	const handleClear = () => {
		setPhotoInputs([]);
		setType('');
		setErrorText('');
		setErrorField('');
		setOpenSnackBar(false);
	};

	const handleCloseSnackBar = (event, reason) => {
		if (reason !== 'clickaway') {
			setOpenSnackBar(false);
		}
	};

	return (
		<>
			<AppBar
				position="relative"
				color="default"
				elevation={0}
				sx={{
					alignItems: {
						md: 'flex-start',
						xs: 'center'
					},
					borderBottom: (theme) => `1px solid ${theme.palette.divider}`
				}}
			>
				<Toolbar>
					<Image src={images.logo} priority alt="Thực Phẩm Tuấn Đạt" />
				</Toolbar>
			</AppBar>
			<Container component="main" maxWidth="sm">
				<Paper variant="outlined" sx={{ mt: 4, mb: 3, p: 3 }}>
					<Typography component="h1" variant="h5" align="left" marginBottom={2}>
						Slider
					</Typography>

					<Stack direction="row" flexWrap={'wrap'} alignItems="center" spacing={2} marginBottom={2}>
						<Button
							fullWidth={false}
							variant="contained"
							component="label"
							color="warning"
							startIcon={<AddPhotoAlternate />}
							sx={buttonStyle}
						>
							<Typography variant="inherit">Choose a photo</Typography>
							<input type="file" hidden multiple accept="image/*" onChange={handleChangeFile} />
						</Button>
						<FormControl sx={{ minWidth: 100 }}>
							<InputLabel
								required
								error={errorField === 'type' && !type ? true : false}
								id="slider-types-label"
								size="small"
							>
								Types
							</InputLabel>
							<Select
								labelId="slider-types-label"
								id="slider-types"
								value={type}
								label="Types"
								size="small"
								autoWidth
								error={errorField === 'type' && !type ? true : false}
								onChange={handleChangeType}
							>
								{sliderTypes.map((type) => (
									<MenuItem key={type.id} value={type.id}>
										{type.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Typography
							variant="caption"
							color="primary"
							sx={{
								fontWeight: 700,
								width: '100%',
								ml: '0px !important',
								mt: '0.5rem !important'
							}}
						>
							Up to {config.slider.limit.max} images, max {config.slider.limit.size} MB each (
							{`Allow: ${config.slider.extensions.join(', ')}`})
						</Typography>
					</Stack>

					<SliderPreview data={photoInputs} onDelete={handleDeletePhotoInput} />

					<Stack
						direction="row"
						justifyContent="center"
						spacing={1}
						sx={{ paddingTop: 2, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}
					>
						<Button
							disabled={photoInputs.length === 0}
							color="primary"
							variant="contained"
							startIcon={<Save />}
							sx={buttonStyle}
							onClick={handleSave}
						>
							<Typography variant="inherit">Save</Typography>
						</Button>

						<Button
							disabled={photoInputs.length === 0}
							color="secondary"
							variant="contained"
							startIcon={<Clear />}
							sx={buttonStyle}
							onClick={handleClear}
						>
							<Typography variant="inherit">Clear</Typography>
						</Button>
					</Stack>
				</Paper>

				<Box marginBottom={2}>
					<SliderList data={photoList} onDelete={handleDeletePhoto} />
				</Box>

				<Typography variant="body2" color="text.secondary" align="center" paddingY={3}>
					Tuấn Đạt © {new Date().getFullYear()}. Powered by Thực Phẩm Tuấn Đạt.
				</Typography>
			</Container>
			<Snackbar
				open={openSnackBar}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				onClose={handleCloseSnackBar}
				autoHideDuration={3000}
			>
				<Alert
					severity="error"
					sx={{
						whiteSpace: 'pre'
					}}
				>
					{errorText}
				</Alert>
			</Snackbar>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBackdrop}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
}
