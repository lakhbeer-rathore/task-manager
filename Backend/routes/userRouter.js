const express = require("express");
const {registerUser,getRegisterUser ,loginUser, logoutUser} = require("../controllers/userController");
const {validateLogin,validateRegister} = require("../middlewares/validationMiddeware");
const router = express.Router();

router.post("/signup", validateRegister , registerUser);
router.post("/login", validateLogin ,loginUser);
router.get("/signup",getRegisterUser);
router.post("/logout", logoutUser);

module.exports = router;