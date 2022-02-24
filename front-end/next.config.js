/** @type {import('next').NextConfig} */
const API_KEY = "12dc1b7826f728c3482e75d5ea25f5a1"
const KAKAO_REDIRECT = "http://localhost:3000/user/welcome"
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/kakaologin",
                destination: `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${KAKAO_REDIRECT}&response_type=code`,
            }
        ];
    }
}
module.exports = nextConfig
