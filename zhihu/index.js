const Koa = require('koa');
const app =new Koa()
const path =require('path')
const koaBody = require('koa-body')
const routing = require('./routers')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const  {connectUrl} = require('./config')
// 到时候如果想要线上地址，吧rul地址垓下就行了，useFindAndModify这个是为了处理编辑的时候控制台警告问题
mongoose.connect(connectUrl, { useNewUrlParser: true, useFindAndModify:false },()=>{
  console.log('mongoDB 连接成功了！')
});
mongoose.connection.on('error',console.error)
// 需要安装 cross-env 这个玩意儿，跨平台设置process env
app.use(error({
  postFormat:(err,{
    stack,...rest
  })=>process.env.NODE_ENV==='production'?rest:{stack,...rest}
}))
app.use(koaBody({
  multipart:true,
  formidable:{
    uploadDir:path.join(__dirname,'/public/uploads'),//上传目录/
    keepExtensions:true,//保留扩展名
  }
}))
app.use(parameter(app)) 
routing(app)
app.listen(3000,()=>{
  console.log('server is running in localhost:3000')
})
