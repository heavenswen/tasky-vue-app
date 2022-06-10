import Axios from 'axios'

const fetch = async config => {
  const {
    method, params, independent, timeout, baseUrl, ...other
  } = config
  const { url } = config

  const headers = {
    // isToken: false
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }

  const timestamp = new Date().getTime()

  // 创建axios实例
  const axiosIns = Axios.create()

  let options = {
    headers,
    // baseURL,
    url,
    ...other,
    timeout: timeout || 10 * 60 * 1000
  }

  if (method === 'post') {
    options = Object.assign({}, options, { method: 'post', data: params })
  } else if (method === 'put') {
    options = Object.assign({}, options, { method: 'put', data: params })
  } else if (method === 'delete') {
    options = Object.assign({}, options, { method: 'delete', data: params })
  } else {
    options = Object.assign(
      {},
      options,
      {
        method: 'get',
        params: {
          ...params,
          timestamp
        }
      }
    )
  }
  // 处理特殊[]符号
  // if (options.method === 'get') {
  //     // let urlStr = '';
  //     const param = JSON.stringify(options.params);
  //     // param.replace(/\[|\]/g,'')
  //     // Object.keys(param).forEach(key => {
  //     //     const val = param[key];
  //     //     if (urlStr) urlStr += '&';
  //     //     urlStr += `${key}=${val ? encodeURI(val) : ''}`;
  //     // });
  //     // options.url += `?${urlStr}`;
  //     options.params = JSON.parse(param.replace(/(\[|\])*/g, ''));
  // }
  const response = await axiosIns(options).then(res => {
    const { code } = res.data

    // independent 存在做单独异常处理，其余走统一业务处理
    if (independent) return res.data
    if (code !== 0 && code !== '0') { // code不为0视为错误,也可以设置 handleMsg自己处理
      return false
    }

    return res.data
  }).catch(err => {
    if (err.response && err.response.status === 401) {
      return false
    } if (err.response && err.response.status === 426) {
      return false
    } if (err.response && err.response.status === 404) {
      return false
    }
    // 错误内容提示
    const errData = err.response ? err.response.data : ''
    const env = process.env.NODE_ENV
    // 非开发环境提示 //(-100, "业务异常")(-200, "系统异常")
    if (env !== 'development' && errData && errData.code === -2) {
      return false
    } if (env !== 'development' && errData &&
            (errData.code === -200 || errData.code === -1)) {
      return false
    }
    // 错误内容提示
    if (errData && typeof errData === 'string') {
      // App.$message({
      //     type: 'error',
      //     message: errData,
      //     showClose: true
      // });
    } else if (errData && typeof errData === 'object' && errData.msg) {
      // App.$message({
      //     type: 'error',
      //     message: errData.msg,
      //     showClose: true
      // });
    } else {
      // App.$message.error(`系统异常:${url}`);
    }

    return false
  })

  return response
}

export default fetch
