import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [products, setProducts] = useState();
    const navigate = useNavigate();

    // Se realiza consulta a BD para traer info de todos los productos
    useEffect(() => {
        axios
            .get(`http://localhost:4000/product/allProducts`)
            .then((res) => {                 
                setProducts(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Row className="d-flex  justify-content-center align-items-center mt-5">
            <Col className="d-flex  flex-wrap justify-content-center align-items-center gap-3">
                {products?.map((product) => {
                    return (
                        <Card style={{ width: "18rem" }}>
                            <Card.Body>
                                <Card.Title>{product.product_name}</Card.Title>

                                <Card.Text>
                                    {product.remarks}
                                </Card.Text>
                                <div className='d-flex flex-wrap gap-1'>
                                    <Button variant="primary" onClick={() => { navigate(`/oneProduct/${product.product_id}`) }}>Ver Producto</Button>
                                    <Button variant="secondary" onClick={() => { navigate(`/variationsProduct/${product.product_id}`) }}>Ver variaciones</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Col>
        </Row>
    );
};
