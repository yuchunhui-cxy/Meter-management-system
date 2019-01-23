'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"/apis/gms"', 
  PERMISSION_HOST: '"/apis/permission_service"',
//自己的登录地址
  LOGIN_URL: '"http://192.168.1.52:8011"'
})
