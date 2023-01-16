const conn = require('../connection')
exports.addStore=(req,res)=>{
    const sql =`INSERT INTO store ?`;
    const ps=req.body
    conn.query(sql, ps, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Operation failed", error });
        if (result) {
          //(result);
          return res
            .status(200)
            .json({ message: "Store added successfully", result });
        }
      });
}
exports.fetchStore=(req,res)=>{
    const sql = `SELECT * FROM store WHERE id = '${req.params.id}'`;
    conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}
exports.updateStore=(req,res)=>{
    const sql = `UPDATE store SET ? WHERE id = '${req.params.id}'`;
    const ps = {storeName: req.body.storeName}
    conn.query(sql, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Operation failed", error });
        if (result) {
          return res.status(200).json({ data: result });
        }
      });
}
exports.deleteStore=(req,res)=>{
    const sql = `DELETE FROM store WHERE id = '${req.params.id}'`;
    conn.query(sql, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Operation failed", error });
        if (result) {
          return res.status(200).json({ data: result });
        }
      });
}
