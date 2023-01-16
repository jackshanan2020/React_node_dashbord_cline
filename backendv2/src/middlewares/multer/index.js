const multer = require('multer');
const {v4: uuidv4} = require('uuid')
const path = require('path')
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname), '../uploads'));
    },
    filename:function(req,file,cb){
        cb(null,uuidv4() +'-'+file.originalname)
    }
})
const upload = multer({storage})
/*allowedFiles:function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type are allowed!';
        return cb(new Error('Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type  are allowed!'), false);
    }
    cb(null, true);
}*/
module.exports = upload