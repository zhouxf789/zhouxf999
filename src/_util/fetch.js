import axios from 'axios'

const defaultLocation = {
  origin: '',
  pathname: ''
}

const fetch = ({ apiLocation = defaultLocation, url, params, method = 'GET', data, token, ip, lang } = {}) => {
  const reqUrl = `${apiLocation.origin}${apiLocation.pathname}${url}`
  const requestData = {
    url: reqUrl,
    method,
    params: {
      ...params,
      deviceId: DeviceId
    },
    data: {
      ...data,
      deviceId: DeviceId
    },
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
