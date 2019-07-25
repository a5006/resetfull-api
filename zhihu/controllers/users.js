const db = [{ name: '李雷' }]
class UsersCtl {
  find(ctx) {
    sad.sd
    ctx.set("Allow", "GET,POST")
    ctx.body = db
  }
  findById(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412, '先决条件错误')
    }
    ctx.body = db[ctx.params.id * 1]
  }
  update(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412, '先决条件错误')
    }
    db[ctx.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  }
  create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true }, // 默认为true
      age: {
        type: 'number', required: false
      }
    })
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }
  delete(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412, '先决条件错误')
    }
    db.splice(ctx.params.id * 1, 1)
    // ctx.body='删除成功'
    ctx.status = 204
  }
}
module.exports = new UsersCtl()