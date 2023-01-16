const router = require('express').Router();
const {validateClientSignUpRequest,validateSignInRequest,isRequestValidated}=require('../../validators')
const {contactformprocessor,addgiftcard,fetchusersettings,updatesettings,updatePassword, signup,signin, updateaccount,fetchUser}=require('../../controllers/user')
const upload = require('../../middlewares/multer');

router.post('/signup',validateClientSignUpRequest,isRequestValidated,signup)
router.post('/signin',signin)

router.put('/update/:id',upload.single('profilePicture'),updateaccount)
//fetch user
router.get('/user/:id',fetchUser)

//setings for notification
router.put('/settings/notification/:id',updatesettings)
router.get('/settings/notification/:id',fetchusersettings)
//gift card
router.post('/user/gift-card/:id',addgiftcard)
//password reset
router.put('/user/password-reset/:id',updatePassword)
//contact form 
router.post('/user/help',contactformprocessor),
//status verification
module.exports = router