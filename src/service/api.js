import axios from 'axios'
import {Response} from '../model'
import mock from '../mock'
import {ConfigModel} from '../model/config'
import {StorageModel} from '../model/storage'
import url from '../../config/url'

const request = (param) => {
  return new Promise((resolve, reject) => {
    // if mock
    if (ConfigModel.isMock) {
      setTimeout(function () {
        resolve(mock[param.url])
      }, 500)
      return
    }
    param.headers = {'content-type': 'application/x-www-form-urlencoded'}
    let token = StorageModel.getUser().token
    if (token) {
      param.headers = {
        'Access-Token': StorageModel.getUser().token
      }
    }
    if (param.method === 'post') {
      param.headers['content-type'] = 'json'
    }
    axios(param).then(v => {
      const response = Response.instance(v.data)
      if (response.isOk()) {
        resolve(v.data)
      } else {
        console.error('response failed: ', response)
        reject(response)
      }
    }).catch(e => {
      console.error('【catch error】: ', e)
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

export const getArticle = (data) => {
  return request({
    url: '/adm/article',
    data: data,
    method: 'post'
  })
}

export const deleteArticle = (data) => {
  return request({
    url: '/adm/deleteArticle?id=' + data.id,
    data: data,
    method: 'get'
  })
}

export const storeArticle = (data) => {
  return request({
    url: '/adm/storeArticle',
    data: data,
    method: 'post'
  })
}

export const updateArticle = (data) => {
  return request({
    url: '/adm/updateArticle',
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

export const captcha = (data) => {
  return request({
    url: '/adm/captcha?ticket=' + data.ticket + '&randstr=' + data.randstr,
    data: data,
    method: 'get'
  })
}
