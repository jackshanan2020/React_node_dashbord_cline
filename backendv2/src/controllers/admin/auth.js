const conn = require("../../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signin = (req, res) => {

  const sql = `SELECT * FROM accounts WHERE ? AND role = 'admin'`;
  let ps = { email: req.body.email };
  conn.query(sql, ps, (err, user) => {
    if (err) {
      res.status(500).json({message:"Operation failed - please try again"});
      throw err;
    } else {
      //	res.status(200).send(result);
    
      if (user.length > 0) {
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
          const payload = {
            fullName: `${user[0].firstName} ${user[0].lastName}`,
            id: user[0].id,
            email: user[0].email,
            role: user[0].role,
            profilePicture:user[0]?.profilePicture
          };
          let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "6h",
          });

          //
          return res
            .cookie("AuthToken", token, {
               httpOnly: true,
               sameSite: 'none',
              secure:true 
            })
            .json({ token, user: payload });
        } else {
          return res.status(400).json({message:"Invalid credentials, please try again"});
        }
      } else {
        return res.status(404).json({message:"User not found"});
      }
    }
  });
};

exports.signup = (req, res) => {

  const url = process.env.PUBLIC_URL
  if(req.file){
    req.body['profilePicture']=`${url}${req.file.filename}`

  }


  const sql = "INSERT INTO accounts SET ?";
  const stmt = req.body;
  conn.query(
    `SELECT email,id FROM accounts WHERE email = '${req.body.email}'`,
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: err });
      } else {
        if (result.length === 0) {
          //hash
          const hash = bcrypt.hashSync(req.body.password, 10);

          stmt["password"] = hash;
         
          conn.query(sql, stmt, (err, result) => {
            if (err) {
              //(err)
              return res.status(500).send({ error: "Something went wrong" });
             
            } else {
              return res.status(200).send(result);
            }
          });
        } else {
          return res.status(403).send("Email is not available");
        }
      }
    }
  );
};
