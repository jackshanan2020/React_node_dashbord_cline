const router = require('express').Router()
const auth = require("../../auth");
const {addStore,fetchStore,updateStore,deleteStore} = require('../controllers/storeController')
const { validateStoreCreate, isRequestValidated } = require("../validators");
router.post('/store', auth,validateStoreCreate, isRequestValidated,addStore)
router.get("/store/:id",auth,fetchStore);
router.put("/store/:id",auth,updateStore)
router.delete("/store/:id",auth,deleteStore)


module.exports = router