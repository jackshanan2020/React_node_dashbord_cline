const conn = require("../connection");
exports.addCoupon = (req, res) => {
  //(req.body);
  const sql = `INSERT INTO coupon SET ?`;
  const {name,code,quantity,status,categoryID,expiryDate}=req.body;
  const ps = {name,code,quantity,status,categoryID,expiryDate} ;
  conn.query(sql, ps, (error, result) => {
    if (error)
      res.status(500).json({ message: "Operation failed", error });
    if (result) {
      
      return res
        .status(200)
        .json({ message: "Coupon created successfully", result });
    }
  });
};

exports.fetchCoupon = (req, res) => {
  const sql = `SELECT * FROM coupon WHERE id = '${req.params.id}'`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ coupons: result });
    }
  });
};
exports.fetchCoupons = (req, res) => {
  const sql = `SELECT * FROM coupon`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      
      return res.status(200).json({ data:result});
    }
  });
};
exports.updateCoupon = (req, res) => {
  //(req.body)
  const {name,code,quantity,status,categoryID,expiryDate}=req.body;
  const sql = `UPDATE coupon SET ? WHERE id = ${req.params.id}`
 const ps = {name,code,quantity,status,categoryID,expiryDate}
  conn.query(sql,ps, (error, result) => {
    if (error)
     return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};
exports.deleteCoupon = (req, res) => {
  const sql = `DELETE FROM coupon WHERE id = '${req.params.id}'`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};
