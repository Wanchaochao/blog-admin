export class Response {
  retcode
  data
  msg

  static instance (data) {
    return new Response(data)
  }

  isOk () {
    return this.retcode == 0
  }

  notLogin () {
    return this.retcode === 401
  }

  constructor (data) {
    for (let key in data) {
      this[key] = data[key]
    }
  }
}
