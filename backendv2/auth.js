const jwt = require("jsonwebtoken");
const dotnev = require("dotenv").config();
const fs= require('fs')

module.exports = (req, res, next) => {
  // Read the token from the cookie
  const token = req.cookies.AuthToken;
 // const {cookies} = req;
 let data =token?JSON.stringify(token):"no token";
 fs.writeFile('logger101.txt',data,(err)=>{
     if(err){
         console.log('logged')
         if(err){
             res.status(403).send('auth failed')
         }
     }
 })
  if (!token)
    return res.status(401).send("Access denied...No token provided...");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
   
    next();
    
  } catch (er) {
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("AuthToken");
    return res.status(401).send(er.message);
  }
};