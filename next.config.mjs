/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

dotenv.config();

const { parsed: localEnv } = dotenv.config({
  path: '.env',
});

// Ensure localEnv is not undefined
const { BASE_URL, API_URL } = localEnv || {};

const nextConfig = {
  images: {
    domains: ['164.90.168.22'],
  },
  env: {
    BASE_URL,
    API_URL,
  },
};

export default nextConfig;