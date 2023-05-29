import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';

export const OneVariation = () => {
    const [variation, setVariation] = useState([]);
    const navigate = useNavigate();
    const { product_variation_id } = useParams();     

    // Consulta a BD para traer la info de una variación
    useEffect(() => {
        axios.
            get(`http://localhost:4000/variation/oneVariationProduct/${product_variation_id}`)
            .then((res) => {
                setVariation(res.data[0]);
            })
            .catch((error) => console.log(error));

    }, [])

    // Manejo del botón del formulario. Consulta a BD para borrar una variación
    const handleButton = () => {

        axios.
            put(`http://localhost:4000/variation/deleteVariationProduct/${product_variation_id}`)
            .then((res) => {
                 
                navigate(('/home'));
            })
            .catch((error) => console.log(error));
    }
    return (
        <Row className="d-flex  justify-content-center align-items-center mt-5">
            <Col className="d-flex justify-content-center align-items-center gap-3">
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>{variation?.product_variation_name}</Card.Title>
                        <div className='d-flex flex-wrap gap-1'>
                            <Button variant="danger" onClick={handleButton}>Borrar</Button>
                            <Button variant="secondary" onClick={() => navigate(`/editVariation/${variation.product_variation_id}`)}>Editar</Button>
                        </div>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
