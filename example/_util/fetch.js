import axios from 'axios'

const defaultLocation = {
  origin : "",
  pathname : ""
}


/**
 * 设置cookie值
 * @param {*} name 字段名
 * @param {*} value 值
 * @param {*} days 有效期 天
 */
export const setCookie = (name, value, days, cookieDomain) => {
  let expires = ''
  let domain = ''
  if (days) {
    const date = new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000)
    expires = ` ;expires=${date.toUTCString()}`
  }
  if (cookieDomain) {
    domain = ` ;domain=${cookieDomain}`
  }
  document.cookie = `${name}=${value}${expires}${domain}`
}




const fetch = ({ apiLocation = defaultLocation , url = "" , params, method = 'get', data , token, ip, lang } = {}) => {

  const reqUrl = `${apiLocation.origin}${apiLocation.pathname}${url}`
  const requestData = {
    url: reqUrl,
    method,
    params,
    data,
    timeout: 7000,
    withCredentials: true
  }
  return axios(requestData)
    .then(res => {
      return res.data
    })
    .catch(err => {
      const errObj = {
        code: 120500001,
        message: '抱歉，系统异常，请稍后再试',
        success: false
      }

      if (err.response === undefined) {
        return errObj
      }

      if (err.response.status >= 400 && err.response.status < 500) {
        return {
          ...err.response.data,
          code: err.response.data.code || 120500002,
          success: false
        }
      } else {
        return errObj
      }
    })
}

export default fetch
