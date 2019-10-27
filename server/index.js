let express = require('express')
let app = express()
let session = require('express-session')
app.use(require('cookie-parser')())
// let cors = require('cors')({
//   'Access-Control-Allow-Origin': 'http://localhost:8080/',
//   'Access-Control-Allow-Credentials': true,
//   'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
//   'Access-Control-Allow-Methods': "GET, POST, OPTIONS"
// })

// app.use(cors)//解决跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Credentials', true)
  next();
});
app.use(express.json())//解析请求体
app.use(session({
  name: 'name',
  secret: "weird sheep",
  resave: false,
  saveUninitialized: false,
  cookie: { user: "default", maxAge: 60 * 1000 }
}));



//引入web下的index.js
require('./router/web/index')(app)
//连接数据库
require('./utils/db')(app)




app.listen('3000', () => {
  console.log('server start')
})