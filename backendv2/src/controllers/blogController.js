const conn = require('../connection')
const url = process.env.PUBLIC_URL;

exports.addBlog=(req,res)=>{
  
    const sql = `INSERT INTO blogs SET ?`;
    const {subTitle,body,title,slug}=req.body
    const ps ={subTitle,body,title,slug}
    if(req.file){
      ps['cover'] =`${url}${req.file.filename}`
    }
    conn.query(sql, ps, (error, result) => {
        if (error)
          res.status(500).json({ message: "Operation failed", error });
        if (result) {
          //(result);
          return res
            .status(200)
            .json({ message: "Brand created successfully", result });
        }
      });
}
exports.fetchBlog=(req,res)=>{
    const sql = `SELECT * FROM blogs WHERE id = '${req.params.id}'`;
    conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}
exports.fetchBlogs=(req,res)=>{
    const sql = `SELECT t1.*,t2.id AS uid,t2.profilePicture,t2.firstName,t2.lastName FROM blogs t1 INNER JOIN users t2 ON t1.authorID=t2.id ORDER BY t1.createdAt DESC`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
}
exports.updateBlog=(req,res)=>{
    const sql =`UPDATE blogs SET ? WHERE id = '${req.params.id}'`;
    const {subTitle,body,title,slug}=req.body
    const ps = {subTitle,body,title,slug}
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
exports.deleteBlog=(req,res)=>{
    const sql = `DELETE FROM blogs WHERE id = '${req.params.id}'`;
    conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}