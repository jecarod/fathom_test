const connection = require("../config/db");

class VariationControllers {

    // Controlador para añadir un nuevo usuario a BD
    newVariation = (req, res) => {
        const { name, product_id } = req.body;        

        let sql = `INSERT INTO product_variation (product_id, product_variation_name) VALUES (${product_id}, "${name}")`;        

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });
    }

    // Controlador para ver todas las variaciones de un producto
    allVariationsProduct = (req, res) => {
        const product_id = req.params.product_id;
         

        let sql = `SELECT * FROM product_variation WHERE product_id = ${product_id} 
                    AND is_deleted = 0`;

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });

    }

    // Controlador para consultar info de una variación
    oneVariationProduct = (req, res) => {
        const { product_variation_id } = req.params;

        let sql = `SELECT * FROM product_variation WHERE product_variation_id = ${product_variation_id}`;         

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });
    }

    // Controlador para realizar el borrado lógico de una variación
    deleteVariationProduct = (req, res) => {
        const { product_variation_id } = req.params;
        
        let sql = `UPDATE product_variation SET is_deleted = 1
                            WHERE product_variation_id = ${product_variation_id}`;
        

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });
    }

    // Controlador para editar info de una variación
    editVariation = (req, res) => {
        const { product_variation_id, product_variation_name } = req.body;

        let sql = `UPDATE product_variation SET product_variation_name = "${product_variation_name}"
                        WHERE product_variation_id = ${product_variation_id}`;   
         

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });

    }

    

}
module.exports = new VariationControllers();