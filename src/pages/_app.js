import Head from 'next/head';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>Chế Biến Nông Sản</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
