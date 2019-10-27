module.exports = app => {
  const router = require('express').Router()
  let Mail = require('../../utils/sendMail')
  // let code = ''//存放验证码
  const User = require('../../models/User')

  //资源中间件，用来查找并引入模型
  const resource = require('../../Middleware/resource')()
  //资源路由，加了两个中间件，先看用户是否存在，再看模型是否存在，最后挂载路由
  app.use('/web/api/rest/:resource',
    resource,
    router)//挂载子路由


  //注册接口
  app.post('/web/api/register', async (req, res) => {
    //因为req.xx的都是字符串类型，生成的验证码是数字类型，需要转换
    let reqCode = Number(req.body.userCode)
    console.log('req.session.verifyCode' + req.session.verifyCode)
    //比对session里的验证码与用户输入的验证码
    if (!req.session.verifyCode) {
      res.send({
        code: 201,
        message: '验证码过期，请重新输入'
      })
    } else if (req.session.verifyCode === reqCode) {
      const model = await User.create(req.body)
      res.send({
        model,
        code: 200,
        message: '注册成功'
      })
    } else {
      res.send({ code: 201, message: '验证码错误' })
    }




  })
  //生成验证码接口
  //邮箱验证码
  app.post('/web/api/getMailCode', async (req, res) => {
    //如果cookie里有isVisit，说明在一分钟内用户又申请发送验证码，拒绝这个请求
    if (req.cookies.isVisit) {
      res.send({ code: 201, message: '一分钟之内不能重复发送' })
    } else {
      let { mail } = req.body
      // console.log(mail)
      try {
        let code = await Mail.send(mail, parseInt(Math.random() * 10000))
        req.session.verifyCode = code;
        console.log('设置了session.verifyCode' + req.session.verifyCode)
        console.log('验证码是' + code)
        res.cookie('isVisit', 1, { maxAge: 60 * 1000, httpOnly: true }) // 该处是设置 cookie
        res.send({ code: 200, message: '发送成功,请前往邮箱查看' })
      }
      catch (err) {
        res.send({ code: 201, message: '发送失败，请确认邮箱地址是否存在' })
      }
    }
  })

  //手机验证码
  app.post('/web/api/getPhoneCode', async (req, res) => {
    let { phone } = req.body
    res.send({ code: 201, message: '收到请求啦没有发送出去(发短信是要收费哒)' })

  })


}
