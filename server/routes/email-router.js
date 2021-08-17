const express = require('express')
const EmailController = require('../controllers/email-controller')

const router = express.Router()

router.post('/sendemail', EmailController.sendEmail)


module.exports = router