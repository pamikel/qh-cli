import querystring from 'querystring'

const query = querystring.parse(location.search.slice(1))

export const env = query.env || 'production'

const base = {
  production: {
    wechatServer: `http://node-wechat-enterprise-server.ingress.98.cn`,
  },
  development: {
    wechatServer: `http://node-wechat-enterprise-server.ingress.98.cn`,
  }
}[env]

export const urls = {
  health: `${base.wechatServer}/health`
}
