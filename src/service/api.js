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
    method: param.method
  }
  return new Promise((resolve, reject) => {
    if (ConfigModel.env() === 'mock') {
      setTimeout(function () {
        resolve(mock[param.url])
      }, 500)
      return
    }
    // console.log("param1:",param.headers)
    param.headers = {
      ...param.headers,
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Access-Control-Allow-Credentials': true,
      'content-type': 'application/x-www-form-urlencoded',
    }

    // console.log("param2",param.headers)
    axios.interceptors.request.use(
      config => {
        // 如果state中存有token,那么每次请求都应该将token放入请求头
        // config.data = JSON.stringify(config.data)
        // config.headers = {
        //   'content-type': 'application/x-www-form-urlencoded'
        // }
        let token = StorageModel.getUser().token
        if (token) {
          config.headers["Access-Token"] = StorageModel.getUser().token
        }
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )
    axios(param).then(v => {
      console.log(param)
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
