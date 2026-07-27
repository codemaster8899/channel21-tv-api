const jwt = require('jsonwebtoken')
const atob = require('atob');
const Admin = require('../model/admin')
require('dotenv').config()

const auth = async (req, res, next) => {
  try{
    const token = await req.header('Authorization').replace('Bearer ', '')
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }else{
      let dateNow = new Date();

      const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
      };

      const decodedJwt = parseJwt(token)
      const admin = await Admin.findOne({_id: decodedJwt._id})
      if(!admin){
        throw new Error()
      }

      if (admin.isAdmin === false) {
        return res.status(403).send({error: 'You haven\'t permission'})
      }

      if (decodedJwt.exp < Math.floor(dateNow.getTime()/1000)){
        return res.status(403).send({error: 'Token was expired. Please login again'})
      }else {
        jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.token = token
        req.admin = admin
        next()
      }
    }    
  }catch(e){
    res.status(403).send({error: 'Please authenticate!'})
  }  
}

module.exports = auth
