import axios from 'axios'
import {Response} from '../model'
import mock from '../mock'
import {ConfigModel} from '../model/Config'
import {StorageModel} from '@/model/storage'
import url from '../../config/url'

axios.defaults.baseURL = url // api基础路径
// axios.defaults.baseURL = '' // api基础路径

const request = (param) => {
  param = {
    ...param,
    method: param.method,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    }
  }
  return new Promise((resolve, reject) => {
    if (ConfigModel.env() === 'mock') {
      setTimeout(function () {
        resolve(mock[param.url])
      }, 500)
      return
    }
    let token = StorageModel.getUser().token
    if (token) {
      param.headers['Access-Token'] = token
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
      console.log('catch', e)
      reject(e)
    })
  })
}

export const loginApi = (data) => {
  return request({
    url: '/adm/login',
    data: data,
    method: 'post'
  })
}

export const getArticles = (data) => {
  return request({
    url: '/adm/articleList',
    data: data,
    method: 'post'
  })
}

export const storeArticle = (data) => {
  return request({
    url: '/adm/storeArticle',
    data: data,
    method: 'post'
  })
}

export const getCategories = (data) => {
  return request({
    url: '/adm/getCategories',
    data: data,
    method: 'post'
  })
}
