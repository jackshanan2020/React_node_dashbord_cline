const express = require("express");
const cors = require("cors");
const path = require('path');
const cookie_parser = require('cookie-parser')
require("./connection");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookie_parser())
app.use(cors({ credentials: true, origin: ['http://localhost:3000','http://localhost:3001'] }));

const PORT = process.env.PORT || 3030;
//


const UserRoutes = require("./routes/user/index.js");
const AdminRoutes = require("./routes/admin/index.js");
const ProductRoutes = require("./routes/product");
const OrderRoutes = require("./routes/order");
const StoreRoute = require("./routes/store");
const VariationRoute = require("./routes/variations");
const CategoryRoute = require("./routes/category");
const BrandRoutes = require("./routes/brands");
const CouponRoutes = require("./routes/coupon");
const BlogsRoutes = require("./routes/blog");
const CartRoutes = require("./routes/cart");
const ProductImagesRoute = require('./routes/productImages')
const MaterialsRoute = require('./routes/materials');
const AttributeRoute = require('./routes/attributes');
const VariantRoute = require('./routes/variants')

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/public/asset', express.static(path.join(__dirname, 'uploads/assets')));

app.use("/api/", AdminRoutes);
app.use("/api/", UserRoutes);
app.use("/api/", ProductRoutes);
app.use("/api/", OrderRoutes);
app.use("/api/", StoreRoute);
app.use("/api/", VariationRoute);
app.use("/api/", CategoryRoute);
app.use("/api/", BrandRoutes);
app.use("/api/", CouponRoutes);
app.use("/api/", BlogsRoutes);
app.use('/api/',CartRoutes)
app.use("/api", ProductImagesRoute);
app.use('/api', MaterialsRoute);
app.use('/api',AttributeRoute)
app.use('/api',VariantRoute)
app.listen(PORT, () => {

  console.log( PORT);

});
