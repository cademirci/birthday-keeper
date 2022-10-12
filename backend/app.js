require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')

const app = express();

const database = require('./database')

app.set('view engine', 'pug')

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes'))

const port = process.env.PORT || 3030
app.listen(port, () => {
  console.log(`app is running on localhost ${port}`)
})