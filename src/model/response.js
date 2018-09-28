export class Response {
  retcode
  data
  msg

  static instance(v) {
    const m = new Response()
    for (const k in v) {
      m[k] = v[k]
    }
    return m
  }

  isOk() {
    return this.retcode == 0
  }

  notLogin() {
    return this.retcode === 401
  }
}
