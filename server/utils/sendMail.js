'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
// async function main () {
// // Generate test SMTP service account from ethereal.email
// // Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();

// 创建发送邮件的对象
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',//发送方邮箱（例如qq) 通过模块文件夹下的lib/wellknown/services.json更改邮箱映射的域名
  port: 587,//端口号
  secure: false, // true for 465, false for other ports
  auth: {
    user: '1074852904@qq.com', // 发送方的邮箱地址
    pass: 'vhaqcvqkhawyfjfa' // mtp验证码
  }
  // });

  // send mail with defined transport object


  // console.log('Message sent: %s', info.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

// main().catch(console.error);


function send (mail, code) {
  let info = {
    from: '山果科技<renne.c@qq.com>', // sender address
    to: mail, // list of receivers
    subject: '山果注册验证码', // Subject line
    text: `您的验证码是${code},有效期一分钟` // plain text body text,html二选一
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(info, (err, info) => {
      if (err) {
        reject('发送失败')
      } else {
        resolve(code)
      }

    })
  })
}
module.exports = { send }