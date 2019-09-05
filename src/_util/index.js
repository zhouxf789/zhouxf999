
/**
 * 多语言实现
 * @param {*} text: String,Required 中文
 * @param {*} option Object,Required =>locales: 对应的多语言文件 lang语言
 * @param {*} data: Object 需要过滤的变量
 * @param {*} label:String 需要过滤的变量的标签
 *
 * simple
 * getLocaleText('首页',locals)
 *
 * advanced
 * getLocaleText('获取了{{x}}件商品',locals,data)
 * getLocaleText('获取了{{x}}件商品',locals,data,'span') 需要用dangerouslySetInnerHTML
 */
export const getLocaleText = (text, def, data, label, className) => {

  let langText = text || def

  if (data) {
    const startLabel = label ? `<${label} className="${className}">` : ''
    const endLabel = label ? `</${label}>` : ''
    for (var x in data) {
      var reg = new RegExp('{{' + x + '}}', 'igm')
      langText = langText.replace(reg, `${startLabel}${data[x]}${endLabel}`)
    }
  }
  return langText
}



export const noop = () => { }

/**
 * 获取cookie值
 * @param {*} name 字段名
 */
export const getCookie = name => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
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
  document.cookie = `${name}=${value}${expires}${domain};path=/`
}


export const getUrlParam = name => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

export const isWeixin = () => {
  const agent = navigator.userAgent.toLowerCase()
  if (agent.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  }
  return false
}

export const stopBodyScroll = (isFixed) => {
  var bodyEl = document.body
  var top1 = 0
  if (isFixed) {
    top1 = window.scrollY
    bodyEl.style.position = 'fixed'
    bodyEl.style.top = -top1 + 'px'
  } else {
    bodyEl.style.position = ''
    bodyEl.style.top = ''
    window.scrollTo(0, top1) // 回到原先的top
  }
}

export const SetgameType = (gameType) => {
  let gameHave = false;
  gameTypes.map((item) => {
    if (item.gameType === gameType) {
      gameHave = true
    }
  })
  if (!gameHave) {
    gameType = "dota"
  }
  return gameType
}

export const userAgentType = () => {
  let user = 'PC浏览器';
  const userAgent = navigator.userAgent;
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent)) {
    user = 'Mobile浏览器'
  }
  if (isWeixin()) {
    user = '微信'
  }
  return user
}


export const openApp = (type, url, channel, id_type = 'id') => {
  console.log(type, url, channel, id_type)
  const lang = getCookie('VPLang') || 'zh_CN'
  const userAgent = navigator.userAgent
  const isAndr =
    userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
  const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  const eventChannel = channel || 'none'

  const query = `lang=${lang}&channel=${eventChannel}`

  let qqChannel = 'rBnowzv'
  switch (eventChannel) {
    case 'prophet':
      qqChannel = 'rBWZWRq'
      break

    case 'roll':
      qqChannel = 'r3jv96j'
      break

    default:
      qqChannel = 'rBnowzv'
      break
  }
  if (isWeixin()) {
    // 需要加渠道
    window.location.href = `https://gio.ren/${qqChannel}`
    return
  }

  let timer

  if (isAndr) {
    if (type === 'activity') {
      // H5页面
      document.location = ``
      timer = window.setTimeout(() => {
        location.href = ``
      }, 2000)
    } else {
      // 原生页面
      document.location = ``
      timer = window.setTimeout(() => {
        location.href = ``
      }, 2000)
    }

    document.addEventListener(
      'visibilitychange',
      function () {
        clearTimeout(timer)
      },
      false
    )
    document.addEventListener(
      'webkitvisibilitychange',
      function () {
        clearTimeout(timer)
      },
      false
    )
    window.addEventListener(
      'pagehide',
      function () {
        clearTimeout(timer)
      },
      false
    )
  }

  if (isiOS) {
    if (type === 'activity') {
      // H5页面
      document.location = ``
    } else {
      // 原生页面
      document.location = ``
    }
  }
}

export const gioTrack = (eventId, otherEvent) => {
  if (window.gio) {
    console.log(`gioTrack:${eventId}`)
    gio('track', eventId, {
      'VPLang': getCookie('VPLang') || 'zh_CN',
      'VPSource': 'web',
      'Device_Source': userAgentType(),
      ...otherEvent
    })
    gio('send')
  }
}
