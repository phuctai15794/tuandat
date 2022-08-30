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
import images from '~/assets/images';
import { SliderList, SliderPreview } from '~/components/Slider';

const buttonStyle = {
	fontWeight: '500',
	textTransform: 'inherit',
	paddingY: '0.5rem'
};

export default function Home() {
	const [photos, setPhotos] = useState([]);
	const [type, setType] = useState('');
	const [errorText, setErrorText] = useState('');
	const [errorField, setErrorField] = useState('');
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const typesPhoto = useMemo(
		() => [
			{
				id: 'full',
				title: 'Full'
			},
			{
				id: 'advertise',
				title: 'Advertise'
			},
			{
				id: 'factory',
				title: 'Factory'
			},
			{
				id: 'partner',
				title: 'Partner'
			}
		],
		[]
	);

	useEffect(() => {
		return () => {
			if (photos.length) {
				photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
			}
		};
	}, [photos]);

	const handleChangePhoto = (e) => {
		const { files } = e.target;
		let photos = [];

		if (files.length) {
			for (const key in files) {
				if (files.hasOwnProperty(key)) {
					const file = files[key];
					file.preview = URL.createObjectURL(file);
					photos.push(file);
				}
			}

			setPhotos(photos);
		}
	};

	const handleChangeType = (e) => {
		const value = e.target.value;
		setType(value);
	};

	const handleDeletePhoto = useCallback(
		(item) => {
			const newPhotos = photos.filter((photo) => photo.name !== item.name);
			setPhotos(newPhotos);
		},
		[photos]
	);

	const handleSave = () => {
		if (photos.length === 0) {
			setErrorText('Please choose a photo');
			setOpenSnackBar(true);
		} else if (type === '') {
			setErrorField('type');
			setErrorText('Please choose a type');
			setOpenSnackBar(true);
		} else {
			const data = {
				photos,
				type
			};

			console.log(data);
		}
	};

	const handleClear = () => {
		setPhotos([]);
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
					<Image src={images.logo} alt="Thực Phẩm Tuấn Đạt" />
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
							<input type="file" hidden multiple accept="image/*" onChange={handleChangePhoto} />
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
								{typesPhoto.map((type) => (
									<MenuItem key={type.id} value={type.id}>
										{type.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>

					<SliderPreview data={photos} onDelete={handleDeletePhoto} />

					<Stack
						direction="row"
						justifyContent="center"
						spacing={1}
						sx={{ paddingTop: 2, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}
					>
						<Button
							disabled={photos.length === 0}
							color="primary"
							variant="contained"
							startIcon={<Save />}
							sx={buttonStyle}
							onClick={handleSave}
						>
							<Typography variant="inherit">Save</Typography>
						</Button>

						<Button
							disabled={photos.length === 0}
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
					<SliderList />
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
