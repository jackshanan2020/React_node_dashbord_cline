const router = require('express').Router()
const auth = require("../../auth");
const upload = require('../middlewares/multer')
const {fetchAttributes}=require('../controllers/attributeController')

router.get('/attributes',fetchAttributes)
module.exports = router