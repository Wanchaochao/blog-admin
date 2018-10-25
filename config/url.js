const DEV_URL = 'http://localhost:8080/'
const PRO_URL = 'http://api.littlebug.vip/'
const env = process.env.NODE_ENV || 'development'
export default env === 'development' ? DEV_URL : PRO_URL
