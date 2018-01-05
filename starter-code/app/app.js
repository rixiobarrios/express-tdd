const express    = require('express')
const path       = require('path')
const logger     = require('morgan')
const bodyParser = require('body-parser')
const app        = express()

app.set('port', 3000)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./controllers'))

app.listen(app.get('port'), _ => console.log(`Running on port ${app.get('port')}.`))
