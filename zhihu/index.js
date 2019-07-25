const Koa = require('koa');
const app =new Koa()
const bodyparser = require('koa-bodyparser')
const routing = require('./routers')
const error = require('koa-json-error')
const parameter = require('koa-parameter')

// 需要安装 cross-env 这个玩意儿，跨平台设置process env
app.use(error({
  postFormat:(err,{
    stack,...rest
  })=>process.env.NODE_ENV==='production'?rest:{stack,...rest}
}))
app.use(bodyparser())
app.use(parameter(app)) 
routing(app)

app.listen(3000,()=>{
  console.log('server is running in localhost:3000')
})