var express = require("express");
const productControllers = require("../controllers/productControllers");
var router = express.Router();


//1.- newProduct
//localhost:4000/product/newProduct
router.post("/newProduct", productControllers.newProduct);

//2.- allProducts
//localhost:4000/product/allProducts
router.get("/allProducts", productControllers.allProducts);

//3.- oneProduct
//localhost:4000/product/oneProduct/product_id
router.get("/oneProduct/:product_id", productControllers.oneProduct);

//4.- editProduct
//localhost:4000/product/editProduct
router.put("/editProduct", productControllers.editProduct);

//4.- deleteProduct - Borrado lógico
//localhost:4000/product/deleteProduct/product_id
router.put("/deleteProduct/:product_id", productControllers.deleteProduct);


module.exports = router;