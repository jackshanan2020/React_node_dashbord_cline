const router = require('express').Router()
const auth = require("../../auth");
const upload = require('../middlewares/multer');
const {addVariant,fetchProductVariants}=require('../controllers/variantsController')

router.post('/product-variant',upload.array('variant_thumbnails'),addVariant);
router.get('/product-variant/:id',fetchProductVariants)
module.exports = router