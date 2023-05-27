const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getQuotes)
router.post('/new', homeController.createQuotes)
router.put('/editquote', homeController.editQuotes)
router.delete('/deletequote', homeController.deleteQuotes)

module.exports = router
