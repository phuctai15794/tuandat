import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { muiTheme, muiEmotionCache } from '~/utils';
import '../styles/globals.scss';

const clientEmotionCache = muiEmotionCache();

function MyApp(props) {
	const { Component, emotionCache = clientEmotionCache, pageProps } = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>Chế Biến Nông Sản</title>
			</Head>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired
};

export default MyApp;
