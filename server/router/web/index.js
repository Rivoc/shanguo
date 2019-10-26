module.exports = app => {
  const router = require('express').Router()
  let Mail = require('../../utils/sendMail')
  let code = ''//存放验证码

  //资源中间件，用来查找并引入模型
  const resource = require('../../Middleware/resource')()
  //资源路由，加了两个中间件，先看用户是否存在，再看模型是否存在，最后挂载路由
  app.use('/web/api/rest/:resource',
    resource,
    router)//挂载子路由


  //新增数据
  router.post('/', async (req, res) => {
    let reqCode = req.body.code
    if (reqCode === code) {
      const model = await req.Model.create(req.body)
      res.send({
        message: '注册成功',
        model
      })
    } else {
      res.send(422).send({ message: '验证码错误' })
    }




  })
  //生成验证码接口
  app.post('/web/api/getMailCode', async (req, res) => {
    let { mail } = req.body
    try {
      code = await Mail.send(mail, parseInt(Math.random() * 10000))
      console.log(code)
      res.status(200).send({ message: '发送成功,请前往邮箱查看' })
    }
    catch (err) {
      console.log(err)
      res.status(307).send({ message: 'Something blew up!' });
    }
  })
}
