/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'http://localhost:8000/api',
      'localhost',
      'class-wiyw.onrender.com',
    ],
  },
}
