const express = require('express')
const ScreeningController = require('../controllers/screening-controller')

const router = express.Router()

router.get('/screening', ScreeningController.screening)


module.exports = router
