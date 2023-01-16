const conn = require('../connection')
exports.addVariation=(req,res)=>{
    const sql =`INSERT INTO productvariations ?`;
    const ps=req.body
    conn.query(sql, ps, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Operation failed", error });
        if (result) {
          //(result);
          return res
            .status(200)
            .json({ message: "Product variations added successfully", result });
        }
      });
}
exports.fetchVariation=(req,res)=>{
    const sql = `SELECT * FROM productvariations WHERE id = '${req.params.id}'`;
    conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}
exports.fetchVariations=(req,res)=>{
    const sql = `SELECT * FROM productvariations ORDER BY createdAt DESC`;
    conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}
exports.updateVariation=(req,res)=>{
    const sql = `UPDATE productvariations SET ? WHERE id = '${req.params.id}'`;
    const ps = {storeName: req.body.storeName}
    conn.query(sql, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Operation failed", error });
        if (result) {
          return res.status(200).json({ data: result });
        }
      });
}

/********************CREATE VARIATIONS */

exports.addNewVariation=(req,res)=>{
  const sql =`INSERT INTO variation SET ?`;
  const {name,variationType} =req.body
  const ps={name,variationType}
  conn.query(sql, ps, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res
          .status(200)
          .json({ message: "Product variations added successfully", result });
      }
    });
}



exports.fetchNewVariations=(req,res)=>{
  const sql = `SELECT * FROM variation ORDER BY id DESC`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
}
exports.deleteVariation=(req,res)=>{
  const sql = `DELETE FROM variation WHERE id = '${req.params.id}'`;
  conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}