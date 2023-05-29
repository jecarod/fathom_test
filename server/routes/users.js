var express = require("express");
const userControllers = require("../controllers/userControllers");
var router = express.Router();
// const multer = require("../middleware/multer");
// const multerSingle = require("../middleware/multerSingle");
// const verify = require("../middleware/verify");


//-----------------------------------------------------
//1.- createUser
//localhost:4000/users/createUser
router.post("/createUser", userControllers.createUser);


//-------------------------------------------------------
//2.-login
//localhost:4000/users/login
router.post("/login", userControllers.login);
 

module.exports = router;
