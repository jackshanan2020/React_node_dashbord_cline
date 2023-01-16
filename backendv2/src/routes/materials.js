const router = require("express").Router();
const auth = require("../../auth");
const upload = require("../middlewares/multer/");
const {
    fetchMaterials,
  addMaterials,
  deleteMaterial,
} = require("../controllers/materialController");
router.post("/materials/add", auth, upload.single("thumbnail"), addMaterials);
router.delete("/materials/remove", auth, deleteMaterial);
router.get("/materials", auth, fetchMaterials);
module.exports = router;
