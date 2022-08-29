import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
	CssBaseline,
	AppBar,
	Container,
	Toolbar,
	Paper,
	Typography,
	Stack,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	FormControlLabel,
	Button,
	Snackbar,
	Alert,
	Box
} from '@mui/material';
import { Clear, Save, AddPhotoAlternate } from '@mui/icons-material';
import images from '~/assets/images';
import { SliderList } from '~/components/Slider';

const buttonStyle = {
	fontWeight: '500',
	textTransform: 'inherit',
	paddingY: '0.5rem'
};

export default function Home() {
	const [photo, setPhoto] = useState('');
	const [type, setType] = useState('');
	const [alt, setAlt] = useState('');
	const [link, setLink] = useState('');
	const [errorText, setErrorText] = useState('');
	const [errorField, setErrorField] = useState('');
	const [openSnackBar, setOpenSnackBar] = useState(false);

	useEffect(() => {
		return () => URL.revokeObjectURL(photo.preview);
	}, [photo.preview]);

	const handleChangePhoto = (e) => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		console.log(file.preview);
		setPhoto(file);
	};

	const handleChangeType = (e) => {
		const value = e.target.value;
		setType(value);
	};

	const handleChangeInput = (e, type) => {
		const value = e.target.value;

		if (type === 'alt') {
			setAlt(value);
		} else if (type === 'link') {
			setLink(value);
		} else {
			return;
		}
	};

	const handleSave = () => {
		if (photo === '') {
			setErrorText('Please choose a photo');
			setOpenSnackBar(true);
		} else if (type === '') {
			setErrorField('type');
			setErrorText('Please choose a type');
			setOpenSnackBar(true);
		} else if (alt === '') {
			setErrorField('alt');
			setErrorText('Please enter an alt');
			setOpenSnackBar(true);
		} else if (link === '') {
			setErrorField('link');
			setErrorText('Please enter a link');
			setOpenSnackBar(true);
		} else {
			const data = {
				photo,
				type,
				alt,
				link
			};

			console.log(data);
		}
	};

	const handleClear = () => {
		setPhoto('');
		setType('');
		setAlt('');
		setLink('');
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
				position="absolute"
				color="default"
				elevation={0}
				sx={{
					alignItems: {
						md: 'flex-start',
						xs: 'center'
					},
					position: 'relative',
					borderBottom: (theme) => `1px solid ${theme.palette.divider}`
				}}
			>
				<Toolbar>
					<Image src={images.logo} alt="Thực Phẩm Tuấn Đạt" />
				</Toolbar>
			</AppBar>
			<Container component="main" maxWidth="lg">
				<Paper variant="outlined" sx={{ mt: 4, mb: 3, p: 3 }}>
					<Typography
						component="h2"
						align="left"
						marginBottom={4}
						sx={{
							typography: {
								md: 'h4',
								xs: 'h5'
							},
							marginBottom: 2
						}}
					>
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
							<input type="file" hidden accept="image/*" onChange={handleChangePhoto} />
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
								<MenuItem value="full">Full</MenuItem>
								<MenuItem value="advertise">Advertise</MenuItem>
								<MenuItem value="factory">Factory</MenuItem>
								<MenuItem value="partner">Partner</MenuItem>
							</Select>
						</FormControl>
					</Stack>

					<Box marginBottom={3}>
						<SliderList />
					</Box>

					<Stack direction="row" justifyContent="center" spacing={1}>
						<Button
							color="primary"
							variant="contained"
							startIcon={<Save />}
							sx={buttonStyle}
							onClick={handleSave}
						>
							<Typography variant="inherit">Save</Typography>
						</Button>
						<Button
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
