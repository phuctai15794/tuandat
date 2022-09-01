import React, { useEffect, useMemo, useCallback, useState } from 'react';
import Image from 'next/future/image';
import {
	CssBaseline,
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
	Box
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
	const sliderTypes = useMemo(() => config.sliderTypes, []);
	const defaultType = sliderTypes[0].id || '';

	const [photoInputs, setPhotoInputs] = useState([]);
	const [photoList, setPhotoList] = useState([]);
	const [isFetch, setIsFetch] = useState(true);
	const [type, setType] = useState(defaultType);
	const [errorText, setErrorText] = useState('');
	const [errorField, setErrorField] = useState('');
	const [openSnackBar, setOpenSnackBar] = useState(false);

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

	const handleChangeFile = (e) => {
		const { files } = e.target;
		let photosData = [];

		if (files.length) {
			for (const key in files) {
				if (files.hasOwnProperty(key)) {
					const file = files[key];
					file.preview = URL.createObjectURL(file);
					photosData.push(file);
				}
			}

			setPhotoInputs(photosData);
		}
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

	const handleDeletePhoto = useCallback((id) => {
		if (id) {
			detelePhoto(id);
			setIsFetch(true);
		}
	}, []);

	const handleSave = () => {
		if (photoInputs.length === 0) {
			setErrorText('Please choose a photo');
			setOpenSnackBar(true);
		} else if (type === '') {
			setErrorField('type');
			setErrorText('Please choose a type');
			setOpenSnackBar(true);
		} else {
			Promise.all(
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
			<CssBaseline />
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

					<Stack direction="row" alignItems="center" spacing={2} marginBottom={2}>
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
				<Alert severity="error">{errorText}</Alert>
			</Snackbar>
		</>
	);
}
