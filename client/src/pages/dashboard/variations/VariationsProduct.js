import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const VariationsProduct = () => {
    const [variations, setVariations] = useState();
    const { product_id } = useParams();
     
    // Consulata a BD para traer info de de todas las variaciones de un mismo producto
    useEffect(() => {
        axios
            .get(`http://localhost:4000/variation/allVariationsProduct/${product_id}`)
            .then((res) => {
                console.log(res);
                setVariations(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    

    return (
        <Row className="d-flex justify-content-center align-items-center mt-5">
            <Col className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                {variations?.map((variation) => {
                    return (
                        <Card style={{ width: "18rem" }}>
                            <Card.Body>
                                <Card.Title>{variation.product_variation_name}</Card.Title>                                 
                            </Card.Body>
                        </Card>
                    );
                })}
            </Col>
        </Row>
    )
}
