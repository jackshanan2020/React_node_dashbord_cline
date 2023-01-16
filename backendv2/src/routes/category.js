const router = require('express').Router()
const auth = require("../../auth");
const upload = require('../middlewares/multer')
const upload2 = require('../middlewares/multer/upload-asset')
const {
deleteDepartment,
updateDepartment,
fetchDepartment,
createDepartment,
addCategory,
fetchCategoriesForClient,
fetchCategories,
fetchCategory,
updateCategory,
deleteCategory,
addParentCategory,
fetchParentCategory,
deleteParentCategory,
updateParentCategory,
addSubCategory,
fetchSubCategories,
updateSubCategory,
deleteSubCategory,
structureCategory

} = require('../controllers/categoryController')
const { validateCategoryCreate, isRequestValidated } = require("../validators");

router.post('/admin/category/addcategory',validateCategoryCreate, isRequestValidated,upload2.single('thumbnail'),addCategory)
router.get("/category/:id",fetchCategory);
router.get("/service/categories/",fetchCategoriesForClient);
router.get("/categories/all",fetchCategories);
router.put("/admin/category/:id",updateCategory);
router.delete("/admin/category/:id",deleteCategory);

//**********************DEPARTMENT - ROUTES********************************************
router.post('/department/add',upload2.single('thumbnail'),createDepartment)
router.get('/departments/all',fetchDepartment);
router.patch('/department/update',upload2.single('thumbnail'),updateDepartment)
router.delete('/department/remove/:id',deleteDepartment)

//************************PARENT CATEGORY ROUTES******************************************************
router.post('/main-category',addParentCategory);
router.get('/main-category',fetchParentCategory);
router.delete('/main-category/:id',deleteParentCategory);
router.put('/main-category',updateParentCategory);


//************************SUB CATEGORY****************************************************
router.post('/sub-category/add',upload2.single('thumbnail'),addSubCategory);
router.get('/sub-category/all',fetchSubCategories);
router.delete('/sub-category/remove/:id',deleteSubCategory);
router.put('/sub-category',updateSubCategory);

//*******************************category structure for menu*******************

router.get('/departments/menu',structureCategory)






module.exports = router