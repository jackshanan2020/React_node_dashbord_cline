const upload = require('../../middlewares/multer');
const router = require('express').Router()
const {signin,signup} = require('../../controllers/admin/auth')
const {fetchUsers,fetchUser,updateUser,deleteUser,banUser,verifyUser} = require('../../controllers/admin/user')


//const auth = require('../../auth')
const {validateSignUpRequest,validateRegistration,validateSignInRequest,isRequestValidated}=require('../../validators/')
router.post('/admin/signin',validateSignInRequest,isRequestValidated,signin);
router.post('/admin/signup',validateRegistration,isRequestValidated,upload.single('picture'),signup);

//user routes
router.get('/admin/users/all',fetchUsers)
router.get('/admin/user/:id',fetchUser)
router.delete('/admin/user/:id',deleteUser)
router.patch('/admin/user/status/:id',verifyUser)
router.put('/admin/user/:id',upload.single('profilePicture'),updateUser);
module.exports =router