const { check, validationResult } = require("express-validator");
exports.validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("email").isEmail().withMessage("Valid email required"),
  check("role").notEmpty().withMessage("Role is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];
exports.validateClientSignUpRequest =(req,res,next)=> {
  let cvals = [
    check(req.firstName).notEmpty().withMessage("firstName is required"),
    check(req.lastName).notEmpty().withMessage("lastName is required"),
  //check("email").isEmail().withMessage("Valid email required"),
  //check("role").notEmpty().withMessage("Role is required"),
  check(req["password"])
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long"),
];
cvals
next()
}

exports.validateRegistration = (req, res, next) => {
  let val = [
    check(req.firstName).notEmpty().withMessage("firstName is required"),
    check(req.lastName).notEmpty().withMessage("lastName is required"),
    check(req["email"]).isEmail().withMessage("Valid email required"),
    check(req["role"]).notEmpty().withMessage("Role is required"),
    check(req["password"])
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long"),
  ];
  val;
  next();
};
exports.validateSignInRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

exports.validateProductListing = (req, res, next) => {
  let val = [
    check(req["name"]).notEmpty().withMessage("Product name is required"),
    check(req["slug"]).notEmpty().withMessage("Slug is required"),
    check(req["longDescription"]).notEmpty().withMessage("Product description"),
    check(req["shortDescription"])
      .notEmpty()
      .withMessage("Product description"),
    check(req["price"]).notEmpty().withMessage("Product price is required"),
    check(req["quantity"]).notEmpty().withMessage("Item quantity is required"),
    check(req["store"]).notEmpty().withMessage("An error occurred"),
  ];
  val;
  next();
};

exports.validateProductUpdate = (req, res, next) => {
  let val = [
    check(req["name"]).notEmpty().withMessage("Product name is required"),
    check(req["slug"]).notEmpty().withMessage("Slug is required"),
    check(req["longDescription"]).notEmpty().withMessage("Product description"),
    check(req["shortDescription"])
      .notEmpty()
      .withMessage("Product description"),
    check(req["price"]).notEmpty().withMessage("Product price is required"),
    check(req["quantity"]).notEmpty().withMessage("Item quantity is required"),
    check(req["store"]).notEmpty().withMessage("An error occurred"),
  ];
  val;
  next();
};
exports.validateVariationCreate = [
  check("variationType").notEmpty().withMessage("Variation type is required"),
  check("variations").notEmpty().withMessage("Variations is required"),
  check("name").notEmpty().withMessage("Variation name is required"),
];
exports.validateNewVariationCreate = [
  check("variationType").notEmpty().withMessage("Variation type is required"),
  check("name").notEmpty().withMessage("Variation name is required"),
];

exports.validateCategoryCreate = (req, res, next) => {
  let val = [
    check("categoryName").notEmpty().withMessage("Category name is required"),
  ];
  val;
  next();
};

exports.validateCouponCreate = [
  check("categoryID").notEmpty().withMessage("Category is required"),
];

exports.validateStoreCreate = [
  check("storeName").notEmpty().withMessage("Store name is required"),
];
exports.validateOrderCreate = [
  check("orderUserID").notEmpty().withMessage("Operation failed"),
];
exports.validateBrandCreate = (req, res, next) => {
  const val = [check("brandName").notEmpty().withMessage("Operation failed")];
  val;
  next();
};

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    //(errors);
    return res.status(400).json({ error: errors });
  }
  next();
};
