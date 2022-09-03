import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

export default function muiEmotionCache() {
	let insertionPoint;

	if (isBrowser) {
		const emotionInsertionPoint = document.querySelector('meta[name="emotion-insertion-point"]');
		insertionPoint = emotionInsertionPoint ?? undefined;
	}

	return createCache({ key: 'tuandat', insertionPoint });
}
