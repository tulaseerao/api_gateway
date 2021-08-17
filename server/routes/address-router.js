const express = require('express')
const AddressController = require('../controllers/address-controller')

const router = express.Router()

router.post('/validate', AddressController.validate)


module.exports = router