import axios from 'axios'
import {Response} from '../model'
import mock from '../mock'
import {ConfigModel} from '../model/Config'

const request = (param) => {
  param = {
    ...param,
    method: 'post'
  }
  return new Promise((resolve, reject) => {
    if (ConfigModel.env === 'mock') {
      setTimeout(function () {
        resolve(mock[param.url])
      }, 500)
      return
    }

    axios(param).then(v => {
      const m = Response.instance(v.data)
      // console.log("v.data" , v.data , m.isOK())
      // if (m.notLogin()) {
      //   m.redirect('login')
      // }
      if (m.isOk()) {
        resolve(v.data)
      } else {
        reject(m)
      }
    }).catch(e => {
      // console.log("catch" , JSON.stringify(e))
      reject(e)
    })
  })
}

export const loginApi = (data) => {
  return request({
    url: '/admin/login',
    data: data
  })
}
