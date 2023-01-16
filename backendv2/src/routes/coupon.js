const router = require('express').Router()
const auth = require("../../auth");
const {addCoupon,fetchCoupons,fetchCoupon,deleteCoupon,updateCoupon} = require('../controllers/couponController')
const { validateCouponCreate, isRequestValidated } = require("../validators");
router.post('/admin/coupon/addcoupon',validateCouponCreate, isRequestValidated,addCoupon)
router.get("/coupon/:id",fetchCoupon);
router.get("/coupons/all",fetchCoupons);
router.put("/admin/coupon/:id",updateCoupon)
router.delete("/admin/coupon/:id",deleteCoupon)


module.exports = router