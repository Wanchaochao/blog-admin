export const captcha = () => {
  return new Promise((resolve, reject) => {
    try {
      let captcha = new TencentCaptcha(
        '2070777383',
        function (res) {
          console.log(res)
          if (res.ret === 0) {
            resolve(res)
          } else {
            reject('canceled!')
          }
        }
      )
      captcha.show()
    } catch (e) {
      console.log('createCaptcha Error', e)
      reject(e)
    }
  })
}
