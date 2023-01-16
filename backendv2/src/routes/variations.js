const router = require("express").Router();
const auth = require("../../auth");
const {
  addNewVariation,
  addVariation,
  fetchVariation,
  fetchVariations,
  fetchNewVariations,
  updateVariation,
  deleteVariation,
} = require("../controllers/variationController");
const {
  validateNewVariationCreate,
  validateVariationCreate,
  isRequestValidated,
} = require("../validators");
router.post(
  "/variation",
  auth,
  validateVariationCreate,
  isRequestValidated,
  addVariation
);
router.post(
  "/admin/variation/new-variation",
 
  validateNewVariationCreate,
  isRequestValidated,
  addNewVariation
);

router.get("/variation/:id", auth, fetchVariation);
router.get("/admin/variations/all",  fetchNewVariations);
router.put("/variation/:id", auth, updateVariation);
router.delete("/admin/variation/:id", deleteVariation);

module.exports = router;
