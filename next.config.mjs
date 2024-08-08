/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: 'canvas' }];  // required by react-beautiful-dnd
        return config;
    },
};

export default nextConfig;
