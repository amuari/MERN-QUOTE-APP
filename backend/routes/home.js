const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getQuotes)
router.post('/new', homeController.createQuotes)

module.exports = router
