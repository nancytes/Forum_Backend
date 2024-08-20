const express = require('express');
const router = express.Router();
//authentication middleware
const authMiddleware = require('../middleware/authMiddleware');

//user controller
const { register, login, checker } = require('../controller/userController');

//register route
router.post("/register", register)

//login route
router.post("/login", login)

//check user
router.get("/check", authMiddleware, checker)

module.exports = router;