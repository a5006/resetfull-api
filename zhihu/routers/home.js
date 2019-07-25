const Router = require('koa-router')
const router = new Router()
const homeCtl = require('../controllers/home')

router.get('/', ctx => {
  homeCtl.index(ctx)
})



module.exports = router