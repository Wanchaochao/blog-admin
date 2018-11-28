const path = require('path')
const fs = require('fs')
const AliOssPlugin = require('webpack-oss')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV || 'development'
fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'`)

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = env === 'production' ? 'https://littlebug.oss-cn-beijing.aliyuncs.com/admin.littlebug/' : '/'
const target = env === 'production' ? 'http://api.littlebug.vip/' : 'http://localhost:8083/'
// const target = 'http://api.littlebug.vip/'
module.exports = {
  devServer: {
    proxy: {
      '/adm': { // 使用"/api"来代替"http://localhost:8081/"
        target: target, // 源地址
        changeOrigin: true // 改变源
      }
    }
  },
  baseUrl: BASE_URL,
  chainWebpack: config => {
    config.resolve.symlinks(true)
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,

  configureWebpack: config => {
    const plugins = []
    // 上传文件到oss
    if (process.env.ACCESS_KEY_ID || process.env.ACCESS_KEY_SECRET || process.env.REGION || process.env.BUCKET || process.env.PREFIX) {
      plugins.push(
        new AliOssPlugin({
          accessKeyId: process.env.ACCESS_KEY_ID,
          accessKeySecret: process.env.ACCESS_KEY_SECRET,
          region: process.env.REGION,
          bucket: process.env.BUCKET,
          prefix: process.env.PREFIX,
          exclude: /.*\.html$/,
          enableLog: true,
          ignoreError: false,
          deleteMode: false,
          deleteAll: false
        })
      )
    }
    config.plugins = [
      ...config.plugins,
      ...plugins
    ]
  }

}
