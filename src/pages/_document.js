import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { muiTheme, muiEmotionCache } from '~/utils';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="theme-color" content={muiTheme.palette.primary.main} />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<meta name="emotion-insertion-point" content="" />
					{this.props.emotionStyleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (context) => {
	const originalRenderPage = context.renderPage;
	const cache = muiEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	context.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				}
		});

	const initialProps = await Document.getInitialProps(context);
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style, index) => (
		<style
			// eslint-disable-next-line react/no-unknown-property
			key={index}
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags
	};
};
