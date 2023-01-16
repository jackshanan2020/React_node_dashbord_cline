const conn = require('../connection')
const url = process.env.PUBLIC_URL;

exports.addBrand=(req,res)=>{
    const sql = `INSERT INTO brands SET ?`;
    const {brandName,description,title,slug}=req.body
    const ps ={brandName,description,title,slug}
    if(req.file){
      ps['brandLogo'] =`${url}${req.file.filename}`
    }
    conn.query(sql, ps, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Operation failed", error });
        if (result) {
          //(result);
          return res
            .status(200)
            .json({ message: "Brand created successfully", result });
        }
      });
}
exports.fetchBrand=(req,res)=>{
    const sql = `SELECT * FROM brands WHERE id = '${req.params.id}'`;
    conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}
exports.fetchBrands=(req,res)=>{
    const sql = `SELECT * FROM brands ORDER BY createdAt DESC`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).send(result);
    }
  });
}
exports.updateBrand=(req,res)=>{
  //(req.body);
    const sql =`UPDATE brands SET ? WHERE id = '${req.params.id}'`;
    const {brandName,description,title,slug}=req.body
    const ps ={brandName,description,title,slug}
    if(req.file){
      ps['brandLogo'] =`${url}${req.file.filename}`
    }
    conn.query(sql,ps, (error, result) => {
        if (error) throw error
         // return res.status(500).json({ message: "Operation failed", error });
        if (result) {
          return res.status(200).json({ data: result });
        }
      });
}
exports.deleteBrand=(req,res)=>{
    const sql = `DELETE FROM brands WHERE id = '${req.params.id}'`;
    conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}