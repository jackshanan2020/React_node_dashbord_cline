const router = require('express').Router()
const auth = require("../../auth");
const {addBrand,fetchBrand,fetchBrands,updateBrand,deleteBrand} = require('../controllers/brandsController');
const upload = require('../middlewares/multer');
const { validateBrandCreate, isRequestValidated } = require("../validators");
router.post('/admin/brand/addbrand',validateBrandCreate, isRequestValidated,upload.single('brandLogo'),addBrand)
router.get("/admin/brand/:id",fetchBrand);
router.get("/admin/brands/all",fetchBrands);
router.put("/admin/brand/:id",upload.single('brandLogo'),updateBrand)
router.delete("/admin/brand/:id",deleteBrand)


module.exports = router