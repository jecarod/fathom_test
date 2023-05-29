const connection = require("../config/db");

class ProductControllers {

    // Controlador para de alta un nuevo producto
    newProduct = (req, res) => {
        const { name, remarks } = req.body;
        

        let sql = `INSERT INTO product (product_name, remarks) VALUES ("${name}", "${remarks}")`;         

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });
    }

    // Controlador para consultar los productos que no están borrados
    allProducts = (req, res) => {
        let sql = `SELECT * FROM product WHERE is_deleted = 0`;
        
        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });
    } 

    // Controlador para consultar info de un producto
    oneProduct = (req, res) => {
        const { product_id } = req.params;
        let sql = `SELECT * FROM product WHERE product_id = ${product_id}`;
        

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });

    }
    
    // Controlador para editar un producto
    editProduct = (req, res) => {
        const { product_id, product_name, remarks } = req.body;

        let sql = `UPDATE product SET product_name = "${product_name}", remarks = "${remarks}"
                        WHERE product_id = ${product_id}`;        

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });

    }

    // Controlador para realizar el borrado lógico de un producto
    deleteProduct = (req, res) => {
        const { product_id } = req.params;

        let sql = `UPDATE product SET is_deleted = 1
                        WHERE product_id = ${product_id}`;
        
        console.log(sql);

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(result);             
          });

    }

}
module.exports = new ProductControllers();