// подключение express
const express = require('express')
// создаем объект приложения
const app = express()
// подключение mongoose
const mongoose = require('mongoose')

const PORT = 5000
const { MONGOURI } = require('./keys')

require('./models/User')

app.use(require('./routes/auth'))

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
  console.log('connected to mongo!!!')
})
mongoose.connection.on('error', (err) => {
  console.log('err connecting', err)
})
/* const customMiddleware = (req, res, next) => {
  console.log('middleware executed')
  next()
}

app.use(customMiddleware) */

// определяем обработчик для маршрута "/"
app.get('/', (req, res) => {
  // отправляем ответ
  res.send('hello world!')
})

app.get('/about', (req, res) => {
  res.send('about page!')
})

// начинаем прослушивать подключения на указанном порту
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
