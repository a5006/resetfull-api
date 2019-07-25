// const 
const fs =require('fs')
/**
 *
 * 获取当前目录除了index外的文件
 * @param {*} app koa
 */
module.exports = (app)=>{
fs.readdirSync(__dirname).forEach(file=>{
if(file === 'index.js'){
  return 
}
const router = require(`./${file}`) 
  app.use(router.routes()).use(router.allowedMethods())
})
}