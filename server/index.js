let express = require('express')
let app = express()

app.use(require('cors')())//解决跨域
app.use(express.json())//解析请求体



//引入web下的index.js
require('./router/web/index')(app)
//连接数据库
require('./utils/db')(app)




app.listen('3000', () => {
  console.log('server start')
})