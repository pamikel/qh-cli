// 路由配置

import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes, alias} from './url-list'

Vue.use(VueRouter)

export const router = new VueRouter({ routes })

// router.alias(alias)
