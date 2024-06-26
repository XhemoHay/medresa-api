const jwt = require("jsonwebtoken");



const verifyToken = (req, res, next) => {
     const authHeader = req.headers.token;
   
     if (authHeader) {
          const token = authHeader.split(" ")[1];
          jwt.verify(token,process.env.JTW_SEC, (err, data) => {
               if (err) {
                    return res.status(403).json("Token is not valid!")

               } else {
                    req.user = data
                   

               }
               next()

          })
     } else {
          return res.status(401).json("You are not authenticated!");
     }
}

const verifyTokenAuth = (req, res, next) => {
     verifyToken(req, res, () => {
             
          if (req.user.id  || req.user.isAdmin) {
             
               next()
          } else {
               res.status(403).json("You are not allowed to do that")
          }
     })
}

const verifyTokenAndAdmin = (req, res, next) => {
     verifyToken(req, res, () => {
          if (req.user.isAdmin) {
               next()
          } else {
               res.status(403).json("You are not aadmin")
          }
     })
}

module.exports = { verifyToken, verifyTokenAuth, verifyTokenAndAdmin };