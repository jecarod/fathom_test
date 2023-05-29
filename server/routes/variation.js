var express = require("express");
const variationControllers = require("../controllers/variationControllers");
var router = express.Router();


//1.- newProduct
//localhost:4000/variation/newVariation
router.post("/newVariation", variationControllers.newVariation);

//2.- allVariationsProduct
//localhost:4000/variation/allVariationsProduct/product_id
router.get("/allVariationsProduct/:product_id", variationControllers.allVariationsProduct);

//3.- oneVariationProduct
//localhost:4000/variation/oneVariationProduct/product_variation_id
router.get("/oneVariationProduct/:product_variation_id", variationControllers.oneVariationProduct);

//4.- deleteVariationProduct
//localhost:4000/variation/deleteVariationProduct/product_variation_id
router.put("/deleteVariationProduct/:product_variation_id", variationControllers.deleteVariationProduct);

//5.- editVariation
//localhost:4000/variation/editVariation
router.put("/editVariation", variationControllers.editVariation);

 


module.exports = router;