const conn = require("../connection");
const url = process.env.PUBLIC_URL;

saveFileURLS = (files) => {
  let fileUrls = [];
  if (files && files.length > 0) {
    fileUrls = files.map((f) => `${url}${f.filename}`);
  }
  return fileUrls;
};
exports.addProductImages = (req, res) => {
  let images = [];
  if (req.files && req.files.length > 0) {
    fileUrls = saveFileURLS(req.files);
    images = fileUrls;
  } else {
    return res.status(403).json({ message: "No files uploaded" });
  }
  if (images.length > 0) {
    const sql = `INSERT INTO product_images (path,productId) VALUES ?`;
   // const stmt = {productId:req.body.productId,path:images};
    const {productId}=req.body
    conn.query(sql, [ images.map((url)=>[url,productId])], (error, result) => {
      if (error) res.status(500).json({ messsage: "Operation failed" });
      if (result) {

          conn.query(`SELECT * FROM product_images WHERE productId = ${productId}`,(error,result2)=>{
            if (result2) {
              res.status(200).json({ message: "", paths: result2 });
            }
          })

        
      }
    });
  } else {
    return res.status(400).json({ message: "Could not process files" });
  }
};

exports.deleteImage = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM product_images WHERE id = ${id}`;
  const stmt = {};
  conn.query(sql, (error, result) => {
    if (error) res.status(500).json({ messsage: "Operation failed" });
    if (result) {
      res.status(200).json({ message: "", paths: result });
    }
  });
};
exports.fetchImages = (req, res) => {
  const sql = `SELECT * FROM product_images`;
  conn.query(sql, (error, result) => {
    if (error) res.status(500).json({ messsage: "Operation failed" });
    if (result) {
      res.status(200).json({ message: "", paths: result });
    }
  });
};

exports.fetchProductImage = (req, res) => {
  const sql = `SELECT * FROM product_images WHERE productId = ${req.params.id}`;
  conn.query(sql, (error, result) => {
    if (error) res.status(500).json({ messsage: "Operation failed" });
    if (result) {
      res.status(200).json({ message: "", paths: result });
    }
  });
};
