const conn = require("../connection");
const url = process.env.PUBLIC_URL;
/*
saveFileURLS = (files) => {
  let fileUrls = [];
  if (files && files.length > 0) {
    fileUrls = files.map((f) => `${url}${f.filename}`);
  }
  return fileUrls[0];
};*/

exports.addMaterials = (req, res) => {

    let thumbnail ;
  if (req.file) {
    thumbnail = `${url}${req.file.filename}`;
  } else {
    return res.status(403).json({ message: "No files uploaded" });
  }

  if (thumbnail) {
    const sql = `INSERT INTO materials SET ?`;
    const {title,name,material,family,feature,color,description,}=req.body
    const stmt = {
      path: thumbnail,
      title,
      name,
      material,
      family,
      feature,
      color,
      description,
    };
    conn.query(sql, stmt, (error, result) => {
      if (error) throw error//res.status(500).json({ messsage: "Operation failed" });
      if (result) {
        res.status(200).json({ message: "", paths: result });
      }
    });
  } else {
    return res.status(400).json({ message: "Could not process files" });
  }
};


exports.deleteMaterial = (req, res) => {
  const id = req.body.id;
  const sql = `DELETE FROM materials WHERE id = ${id}`;
  const stmt = {};
  conn.query(sql, stmt, (error, result) => {
    if (error) res.status(500).json({ messsage: "Operation failed" });
    if (result) {
      res.status(200).json({ message: "", materials: result });
    }
  });
};
exports.fetchMaterials = (req, res) => {
  const sql = `SELECT * FROM materials`;
  conn.query(sql, (error, result) => {
    if (error) res.status(500).json({ messsage: "Operation failed" });
    if (result) {
      res.status(200).json({ message: "", materials: result });
    }
  });
};
