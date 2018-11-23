const DEV_URL = 'http://localhost:8080/'
const PRO_URL = 'http://api.littlebug.vip/'
export default process.env.NODE_ENV === 'development' ? DEV_URL : PRO_URL
