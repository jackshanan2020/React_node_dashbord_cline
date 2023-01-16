const router = require("express").Router();
const {
  addProduct,
  fetchOne,
  fetchMany,
  updateProduct,
  deleteOne,addreview,updateProductCoverImage,fetchProductBySlug,
  fetchTestJoinTable
} = require("../controllers/product");
const auth = require("../../auth");
const {
  validateProductUpdate,
  validateProductListing,
  isRequestValidated,
} = require("../validators");

const upload = require("../middlewares/multer");
router.post(
  "/admin/product/addProduct",
  validateProductListing,
  isRequestValidated,
  upload.array("productGallery"),
  addProduct
);
router.get("/admin/product/:id", fetchOne);
router.get("/admin/products/all", fetchMany);
router.get("/products/all", fetchMany);
router.get("/product/single/:slug", fetchProductBySlug);
router.put(
  "/admin/product/:id",
  validateProductUpdate,
  isRequestValidated,
  upload.array("productGallery"),
  updateProduct
);
router.patch(`/admin/product/cover`,upload.single('coverImage'),updateProductCoverImage)
router.delete("/admin/product/:id", deleteOne);
//review
router.post('/product/review/:productid/:uid',upload.single('gallery'),addreview)
//test of controller route
router.get('/product/join-tables',fetchTestJoinTable)
module.exports = router;
