const router = require('express').Router()
const auth = require("../../auth");
const {addOrder,fetchOrder,fetchOrders,updateOrder,updateOrderStatus,deleteOrder} = require('../controllers/ordersController')
const { validateOrderCreate, isRequestValidated } = require("../validators");

router.post('/order', auth,addOrder)
router.get("/order/:id",auth,fetchOrder);
router.get("/orders/all",auth,fetchOrders);
router.put("/order/:id",auth,updateOrder)
router.patch('/order/status-update/:id',updateOrderStatus)
router.delete("/order/:id",auth,deleteOrder)


module.exports = router