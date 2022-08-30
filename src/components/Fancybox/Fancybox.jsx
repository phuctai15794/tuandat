/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Fancybox as FancyboxApp } from '@fancyapps/ui/dist/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox.css';

function Fancybox(props) {
	const delegate = props.delegate || '[data-fancybox]';

	useEffect(() => {
		const opts = props.options || {};

		FancyboxApp.defaults.Hash = false;
		FancyboxApp.bind(delegate, opts);

		return () => {
			FancyboxApp.destroy();
		};
	}, []);

	return <>{props.children}</>;
}

export default Fancybox;
