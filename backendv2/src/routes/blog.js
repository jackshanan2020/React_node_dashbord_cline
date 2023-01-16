const router = require('express').Router()
const auth = require("../../auth");
const {addBlog,fetchBlog,fetchBlogs,updateBlog,deleteBlog} = require('../controllers/blogController');
const upload = require('../middlewares/multer');
const { validateCouponCreate, isRequestValidated } = require("../validators");
router.post('/admin/blog/addblog',upload.single('cover'), addBlog)
router.get("/blog/:id",fetchBlog);
router.get("/blogs/all",fetchBlogs);
router.put("/admin/blog/:id",upload.single('cover'),updateBlog)
router.delete("/admin/blog/:id",deleteBlog)


module.exports = router