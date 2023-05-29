import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const initialValue = {
    product_variation_name: "",

};

export const EditVariation = () => {
    const [variation, setVariation] = useState();
    const [editVariation, setEditVariation] = useState(initialValue);
    const { product_variation_id } = useParams();
    const navigate = useNavigate();

    // Consulta a BD para traer la info de una variación
    useEffect(() => {
        axios
            .get(`http://localhost:4000/variation/oneVariationProduct/${product_variation_id}`)
            .then((res) => {                 
                setEditVariation(res.data[0]);
            })
            .catch((error) => console.log(error));

    }, [])  

    // Manejo de los campos de un formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditVariation({ ...editVariation, [name]: value });
    };

    // Consulta a BD para modificar una variación
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:4000/variation/editVariation`, editVariation)
            .then((res) => {                 
                navigate(`/home`);
            })
            .catch((error) => console.log(error));
    };
    return (
        <Row className="d-flex justify-content-center align-items-center mt-5">
            <Col md={6} className="d-flex justify-content-center align-items-center">
                <Form className="w-75">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre de la variación</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre de la variación"
                            name="product_variation_name"
                            value={editVariation.product_variation_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className='d-flex flex-wrap gap-1'>
                        <Button variant="danger" type="submit" className="mr-3" onClick={handleSubmit}>
                            Editar
                        </Button>
                        <Button variant="secondary" type="submit" onClick={() => navigate('/home')}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )

};
