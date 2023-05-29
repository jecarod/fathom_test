import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


const initialValue = {
    product_name: "",
    remarks: "",
};

export const EditProduct = () => {
    const [product, setProduct] = useState();
    const [editProduct, setEditProduct] = useState(initialValue);
    const { product_id } = useParams();
    const navigate = useNavigate();

    // Consulta a BD para traer info de un producto 
    useEffect(() => {
        axios
            .get(`http://localhost:4000/product/oneProduct/${product_id}`)
            .then((res) => {                 
                setEditProduct(res.data[0]);
            })
            .catch((error) => console.log(error));
    }, [])

    // Manejo de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    // Envío de los datos del formulario para actualizar un producto
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:4000/product/editProduct`, editProduct)
            .then((res) => {                
                navigate('/home');
            })
            .catch((error) => console.log(error));
    };
    return (
        <Row className="d-flex justify-content-center align-items-center mt-5">
            <Col md={6} className="d-flex justify-content-center align-items-center">
                <Form className="w-75">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre del producto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre del producto"
                            name="product_name"
                            value={editProduct.product_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Observaciones</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Observaciones"

                            name="remarks"
                            value={editProduct.remarks}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <div className='d-flex flex-wrap gap-1'>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Editar
                        </Button>
                        <Button variant="primary" type="submit" onClick={() => navigate('/home')}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
