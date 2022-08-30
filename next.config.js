/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
