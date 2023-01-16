const router= require('express').Router()
const auth = require("../../auth");
const {
  addToCart,
  incrementCart,
  decrementCart,
  deleteItem,
  fetchCartItems,countCartItems
} = require("../controllers/cartController");

router.get("/cart/cartItems", auth, fetchCartItems);
router.post('/cart/add',auth,addToCart);
router.put('/cart/increment',auth,incrementCart);
router.put("/cart/decrement", auth, decrementCart);
router.delete("/cart/remove-item", auth, deleteItem);
router.get('/cart/count',auth,countCartItems);
module.exports = router