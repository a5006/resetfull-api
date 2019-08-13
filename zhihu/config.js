module.exports = {
  secret:'mytoken',
  connectUrl:'mongodb://localhost:27017/zhihu'
};
// 如果是连接线上的数据库，是要带上密码的，所以那个时候，密码应该使用环境变量来储存，也就是package.json里面启动的时候
//··