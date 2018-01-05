const express = require('express')
const router  = express.Router()

router.use('/candies', require('./candies'))



module.exports = router
