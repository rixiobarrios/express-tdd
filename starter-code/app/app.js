var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var app = express()

app.set('port', 3000)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./controllers'))

app.listen(app.get('port'), _ => console.log(`Running on port ${app.get('port')}.`))
