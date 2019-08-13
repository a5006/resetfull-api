const User = require('../modles/users')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
class UsersCtl {
  async  find(ctx) {
    ctx.set("Allow", "GET,POST")
    ctx.body = await User.find()
  }
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) { ctx.throw(404) }
    ctx.body = user
  }
    async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true }, // 默认为true
      password: { type: 'string', required: true },
    })
    const { name } = ctx.request.body
    const repeatUser = await User.findOne({ name }) // 查询符合条件的第一个用户 / find 是查询到所有匹配的用户，返回一个列表
    if (repeatUser) {
      ctx.throw(409, '用户已经占用')//409 冲突
    }
    let user = await User.create(ctx.request.body)
    let {
      _id,
      __v
    } = user
    ctx.body = {
      _id,
      name,
      __v
    }
  }
  async checkUser(ctx,next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next();
    console.log(2)
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) { ctx.throw(404) }
    ctx.body = user
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) { throw (404, '用户不存在') }
    ctx.status = 204
  }

  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true }, // 默认为true
      password: { type: 'string', required: true },
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, '用户名或密码错误')
    }
    const { _id, name } = user
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' }) //一天过期
    ctx.body = { token }

  }
}
module.exports = new UsersCtl()