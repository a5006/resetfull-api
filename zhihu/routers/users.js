const Router = require('koa-router')
const jwt =require('koa-jwt')
const router = new Router({ prefix: '/users' })
const { find, findById, create, delete: del, update, login, checkUser } = require('../controllers/users')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
const auth =jwt({secret})

// const auth = async (ctx, next) => {
//   // jwt 权限
//   const { authorization = '' } = ctx.request.header
//   const token = authorization.replace('Bearer ', '')
//   try {
//     const user = jsonwebtoken.verify(token, secret)
//     ctx.state.user = user // 为了让后面中间件能拿到用户信息，放在state是约定俗成,通常用来放置用户信息
//   } catch (err) {
//     ctx.throw(401, err.message)
//   }
//  await next();//给下一个中间件调用
// }
//修改接口
// router.put('/:id', update) 整体替换
router.patch('/:id', auth,checkUser, update)  //部分更新
router.post('/', create)
router.delete('/:id', auth,checkUser, del)
router.get('/', find)
router.get('/:id', findById)
router.post('/login', login)
module.exports = router