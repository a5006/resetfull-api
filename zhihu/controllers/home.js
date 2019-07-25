

class HomeCtl {
  constructor() { }
  index(ctx) {
    ctx.body = '<h1>这里是首页</h1>'
  }
}


module.exports = new HomeCtl()