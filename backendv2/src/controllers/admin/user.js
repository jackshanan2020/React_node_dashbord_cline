const conn = require("../../connection");
const path = require('path');
const fs = require('fs');
exports.fetchUsers = (req, res) => {
  const sql = "SELECT * FROM accounts";
  conn.query(sql, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      return res.status(200).send(result);
    }
  });
};

exports.fetchUser = (req, res) => {
  const sql = `SELECT * FROM accounts WHERE id = ${req.params.id}`;
  conn.query(sql, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      return res.status(200).send(result);
    }
  });
};

exports.updateUser = (req, res) => {
  //(req.file)
  const url = process.env.PUBLIC_URL
  
  const sql = `UPDATE accounts SET ? WHERE id = '${req.params.id}'`;
  const ps = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    phone: req.body.phone,
    role:req.body.role
   
  };
  if(req.file){
    //remove old profile picture
    /*conn.query(`SELECT id,profilePicture FROM users WHERE id = ${req.params.id}`,(error,result)=>{
      if (error) return res.status(500).json({ error,message:'Something went wrong' });
      if (result) {
       
     
      }
    })*/
    //then replace with new
    ps['profilePicture']=`${url}${req.file.filename}`

  }
  conn.query(sql, ps, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      return res.status(200).send(result);
    }
  });
};

exports.deleteUser = (req, res) => {
  console.log(req.body,'---')
  const sql = `DELETE FROM accounts WHERE ?`;
  const ps = { id: req.params.id };
  conn.query(sql, ps, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      return res.status(200).send(result);
    }
  });
};
exports.banUser=(req,res)=>{

}
exports.verifyUser=(req,res)=>{
  const sql = `UPDATE accounts SET ? WHERE id = '${req.params.id}'`;
  const ps = {status: req.body.status}
   conn.query(sql, ps, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      return res.status(200).send(result);
    }
  });
}