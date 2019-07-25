const Router = require('koa-router')
const router = new Router({ prefix:'/users'})
const { find, findById, create, delete: del, update} = require('../controllers/users')
const auth = async (ctx, next) => {
  if (ctx.url !== '/users') {
    ctx.throw(401)
  }
  await next()
}
//修改接口
router.put('/:id', update)
router.post('/', create)
router.delete('/:id', del)
router.get('/', find)
router.get('/:id', findById)
module.exports = router