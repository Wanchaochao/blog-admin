import axios from 'axios'
import {Response} from '../model'
import mock from '../mock'
import {ConfigModel} from '../model/Config'
import {StorageModel} from '@/model/storage'
import url from '../../config/url'

axios.defaults.baseURL = url // api基础路径
// axios.defaults.baseURL = '/api' // api基础路径

const request = (param) => {
  param = {
    ...param,
    method: param.method
  }
  return new Promise((resolve, reject) => {
    console.log('Promise begin')
    if (ConfigModel.env() === 'mock') {
      setTimeout(function () {
        resolve(mock[param.url])
      }, 500)
      return
    }

    // 如果state中存有token,那么每次请求都应该将token放入请求头
    let token = StorageModel.getUser().token
    if (token) {
      param.headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Token': StorageModel.getUser().token
      }
    }
    axios(param).then(v => {
      const response = Response.instance(v.data)
      // console.log("v.data" , v.data , response.isOk())
      // if (response.notLogin()) {
      //   response.redirect('login')
      // }
      if (response.isOk()) {
        resolve(v.data)
      } else {
        reject(response)
      }
    }).catch(e => {
      console.log('catch', JSON.stringify(e))
      reject(e)
    })
  })
}

export const loginApi = (data) => {
  return request({
    url: '/api/login',
    data: data,
    method: 'post'
  })
}

export const getArticles = (data) => {
  return request({
    url: '/api/adm/articleList',
    data: data,
    method: 'post'
  })
}

export const storeArticle = (data) => {
  return request({
    url: '/api/adm/storeArticle',
    data: data,
    method: 'post'
  })
}

export const getCategories = (data) => {
  return request({
    url: '/api/adm/getCategories',
    data: data,
    method: 'post'
  })
}
