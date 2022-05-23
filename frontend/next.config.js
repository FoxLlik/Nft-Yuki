/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images:
    {
        domains:
        [
            'avatarfiles.alphacoders.com',
            'wallpaperaccess.com',
            'localhost',
            'process.env.DOMAIN_NAME'
        ]
    },
    env: {
        DOMAIN_NAME: process.env.DOMAIN_NAME
    }
}
