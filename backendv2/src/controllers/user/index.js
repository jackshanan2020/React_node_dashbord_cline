const conn = require("../../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const sql = "INSERT INTO users SET ?";
  const { firstName, lastName, contact, email } = req.body;
  const stmt = { firstName, lastName, contact, email };

  conn.query(
    `SELECT id,contact FROM users WHERE contact = '${req.body.contact}'; SELECT id,email FROM users WHERE email = '${req.body.email}'`,
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: err });
      } else {
        if (result[0].length === 0 && result[1].length === 0) {
          //hash
          const hash = bcrypt.hashSync(req.body.password, 10);

          stmt["password"] = hash;
          stmt["role"] = "user";
          conn.query(sql, stmt, (err, result) => {
            if (err) {
              throw err;
              //return res.status(400).send({ message: "Something went wrong" });
            } else {
              return res
                .status(200)
                .json({ message: "Account created successsfully" });
            }
          });
        } else {
          return res
            .status(403)
            .json({ message: "Sorry contact or Email is unavailable" });
        }
      }
    }
  );
};
exports.signin = (req, res) => {
  //console.log(req.body)
  const sql = "SELECT * FROM users WHERE ? AND role = 'user'";
  const ps = { [req.body.flag]: req.body[req.body.flag] };
  //(sql, ps);
  conn.query(sql, ps, (err, user) => {
    if (err) {
      throw error
      res.status(500).json({ message: "Something went wrong", error: err });
    } else {
      if (user.length > 0) {
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
          const payload = {
            fullName: `${user[0].firstName} ${user[0].lastName}`,
            id: user[0].id,
            role: user[0].role,
            prifilePicture: user[0].profilePicture,
          };
          let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "6h",
          });
          return res
            .cookie("AuthToken", token, {
              httpOnly: true,
               sameSite: 'none',
              secure:true ,
             
            })
            .json({ token, user: payload });
        } else {
          return res
            .status(400)
            .json({ message: "Sorry, incorrect credentials" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }
  });
};

exports.updateaccount = (req, res) => {
  const url = process.env.PUBLIC_URL;

  const sql = `UPDATE users SET ? WHERE id = '${req.params.id}'`;
  const ps = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contact: req.body.contact,
    address: req.body.address,
    role: "user",
  };
  if (req.file) {
    //remove old profile picture

    //then replace with new
    ps["profilePicture"] = `${url}${req.file.filename}`;
  }
  conn.query(sql, ps, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      return res.status(200).send(result);
    }
  });
};
//9/16/2021
exports.fetchUser = (req, res) => {
  const sql = `SELECT * FROM  users WHERE id = ${req.params.id}`;
  conn.query(sql, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result&&result.length>0) {
      
      delete result[0].password
      return res.status(200).send(result[0]);
    }
  });
};
exports.updatesettings = (req, res) => {
  const sql = `UPDATE settings SET ? WHERE userID = ${req.params.id}`;
  const select = `SELECT * FROM settings WHERE userID = ${req.params.id}`;
  const insert = `INSERT INTO settings SET ?`;

  const ps = req.body;

  conn.query(select, (error, result) => {
    if (error) return res.status(501).json({ error });
    if (result && result.length) {
      conn.query(sql, ps, (error, result) => {
        if (error) return res.status(502).json({ error });
        if (result) {
          return res.status(201).send(result);
        }
      });
    } else {
      //insert
      const field = Object.keys(req.body)[0];
      const val = Object.values(req.body)[0];
      const stmt = { userID: req.params.id, [field]: val };
      conn.query(insert, stmt, (error, result) => {
        if (error) return res.status(500).json({ error });
        if (result) {
          return res.status(201).send(result);
        }
      });
    }
  });
};
//settings
exports.fetchusersettings = (req, res) => {
  const select = `SELECT * FROM settings WHERE userID = ${req.params.id}`;
  conn.query(select, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      return res.status(200).send(result);
    }
  });
};

//gift card
exports.addgiftcard = (req, res) => {
  const sql = `INSERT INTO giftcards SET ?`;
  const ps = { ...req.body, userID: req.params.id };
  conn.query(sql, ps, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      return res.status(200).send(result);
    }
  });
};
exports.updatePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const sql = `SELECT * FROM users WHERE ?`;
  const ps = { id: req.params.id };
  conn.query(sql, ps, (error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      if (result.length > 0) {
        if (bcrypt.compareSync(currentPassword, result[0].password)) {
         
          const hash = bcrypt.hashSync(newPassword, 10);
       //update here
       const update = `UPDATE users SET ? WHERE id = '${req.params.id}'`;
       const stmt ={password:hash}
       conn.query(update,stmt, (error, result) => {
        if (error) return res.status(500).json({ error });
        if (result) {
          res.status(200).json({message:'Password update success'})
        }
      });
       
       
       
        } else {
          return res
            .status(400)
            .json({ message: "Sorry, Operation failed" });
        }
      } else {
        return res.status(404).json({ message: "Could not find match" });
      }
    }
  });
};

exports.contactformprocessor=(req,res)=>{
const sql = `INSERT INTO contactformtbl SET ?`;
const {name,email,topic,message}=req.body
const ps = {name,email,topic,message}
conn.query(sql, ps, (error, result) => {
  if (error) return res.status(500).json({ error });
  if (result) {
    return res.status(200).send(result);
  }
});
}