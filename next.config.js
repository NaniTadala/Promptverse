/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        domains: ['lh3.googleusercontent.com', 'utfs.io'],
    },
}

module.exports = nextConfig
