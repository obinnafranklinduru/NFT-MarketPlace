/** @type {import('next').NextConfig} */

const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(new DotenvWebpackPlugin());
    return config;
  }
}