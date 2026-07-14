const jwt = require("jsonwebtoken");

// console.log("authMiddleware file loaded");
async function authMiddleware(req,res,next) 
{
    // console.log("Middleware running");
    // console.log(req.headers);
    
    
  // const authHeader = req.headers.authorization;
//   console.log("Auth Header:", authHeader);

  // if(!authHeader) {
  //   return res.status(401).json({error: "Unauthorized" });
  // }
  // const token = authHeader.split(" ")[1];

  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json({
      message: "Please login first"
    })  };

 try {
const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
);

req.user =decoded;
next();
 } 
 catch(error) {
    return res.status(401).json({error: "Invalid token"});
 }
}


module.exports = authMiddleware;