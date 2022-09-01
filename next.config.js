const withTM = require('next-transpile-modules')(['@fancyapps/ui']);

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		images: {
			allowFutureImage: true,
            unoptimized: true
		}
	},
	images: {
		domains: ['chebiennongsan.s3.ap-southeast-1.amazonaws.com']
	}
};

module.exports = withTM(nextConfig);
