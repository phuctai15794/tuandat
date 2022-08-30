const withTM = require('next-transpile-modules')(['@fancyapps/ui']);

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		images: {
			allowFutureImage: true
		}
	},
	images: {
		domains: ['picsum.photos', 'i.picsum.photos']
	}
};

module.exports = withTM(nextConfig);
