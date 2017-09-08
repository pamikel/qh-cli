// api 请求实例
import {getRequest} from './adapter'
import {urls} from "../config"

/**
 * wechat server health check
 */
export const health = async () => await getRequest(urls.health)
