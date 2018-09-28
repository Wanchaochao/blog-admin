import axios from 'axios'
import {Response} from '../model'
import mock from '../mock'
import {ConfigModel} from '../model/Config'
import {StorageModel} from '@/model/storage'
import url from '../../config/url'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = url;

const request = (param) => {
  return new Promise((resolve, reject) => {
    // if mock
    if (ConfigModel.isMock) {
      setTimeout(function () {
        resolve(mock[param.url])
      }, 500)
      return
    }
    axios.post('http://www.littlebug.vip',{})
    if (StorageModel.getUser().token) {
      param.headers['Access-token'] = StorageModel.getUser().token
    }
    axios(param).then(v => {
      const response = Response.instance(v.data)
      if (response.isOk()) {
        resolve(v.data)
      } else {
        reject(response)
      }
    }).catch(e => {
      console.error('【catch error】: ', e)
      reject(e)
    })
  })
}

export const loginApi = (data) => {
  // return axios.post('http://api.littlebug.vip/adm/login',data)
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
    url: '/adm/categories',
    data: data,
    method: 'get'
  })
}
