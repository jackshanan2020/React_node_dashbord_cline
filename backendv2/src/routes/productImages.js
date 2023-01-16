const router = require('express').Router();
const auth = require('../../auth')
const upload = require('../middlewares/multer/')
const {fetchImages,addProductImages,deleteImage,fetchProductImage} = require('../controllers/productImagesController');
router.post('/gallery/add',upload.array('gallery'),addProductImages);
router.delete('/gallery/remove/:id', deleteImage)
router.get("/gallery", fetchImages);
router.get('/gallery/:id',auth,fetchProductImage)
module.exports = router