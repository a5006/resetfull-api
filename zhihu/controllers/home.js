

class HomeCtl {
  constructor() { }
  index(ctx) {
    ctx.body = '<h1>这里是首页</h1>'
  }
  upload(ctx){
    const file = ctx.request.files.file
    ctx.body={
      path:file.path
    }
  }
}


module.exports = new HomeCtl()