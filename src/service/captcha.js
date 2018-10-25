export const captcha = () => {
  return new Promise((resolve, reject) => {
    try {
      let captcha = new TencentCaptcha(
        document.getElementById('TencentCaptcha'),
        '2070777383',
        function (res) {
          resolve(res)
        },
        {bizState: '自定义透传参数'}
      )
      captcha.show()
    } catch (e) {
      console.log('createCaptcha Error', e)
      reject(e)
    }
  })
}
