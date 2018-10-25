const path = require('path')
const fs = require('fs')

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
const BASE_URL = env === 'production' ? 'http://littlebug.oss-cn-beijing.aliyuncs.com/admin.littlebug/' : '/'
const target = env === 'production' ? 'http://api.littlebug.vip/' : 'http://localhost:8083/'
// const target = 'http://api.littlebug.vip/'
module.exports = {
  devServer: {
    proxy: {
      '/adm': { // 使用"/api"来代替"http://localhost:8081/"
        target: target, // 源地址
        changeOrigin: true // 改变源
      }
      // '/cap_union_new_verify': {
      //     target: 'https://ssl.captcha.qq.com', //源地址
      //     changeOrigin: true, //改变源
      //     // pathRewrite: {
      //     //     '^/admin': "/" //路径重写
      //     // }
      // },
      // '/caplog': {
      //   target: 'https://dj.captcha.qq.com', //源地址
      //   changeOrigin: true, //改变源
      //   // pathRewrite: {
      //   //     '^/admin': "/" //路径重写
      //   // }
      // }
    }
  },
  baseUrl: BASE_URL,
  // baseUrl: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false
}
