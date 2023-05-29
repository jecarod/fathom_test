import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';

export const OneProduct = () => {
    const [product, setProduct] = useState();
    const [variations, setVariations] = useState([]);
    const [selecVariation, setSelectVariation] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const { product_id } = useParams();

    // Se consulta a BD para traer la info de un producto
    useEffect(() => {
        axios.
            get(`http://localhost:4000/product/oneProduct/${product_id}`)
            .then((res) => {
                setProduct(res.data[0]);

            })
            .catch((error) => console.log(error));

    }, [])

    // Se consulta a BD para traer toda la info de las variaciones de un producto
    useEffect(() => {
        axios
            .get(`http://localhost:4000/variation/allVariationsProduct/${product_id}`)
            .then((res) => {                 
                setVariations(res.data);
            })
            .catch((error) => console.log(error));

    }, [])

    // Manejo de los campos de un formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectVariation({ ...selecVariation, [name]: value });
    };

    // Manejo del botón del formulario para ver las variaciones de un producto
    const handleSubmit = () => {        
        if (selecVariation == undefined) {
            setMessage("Seleccione una variación");
        } else {
            navigate(`/oneVariation/${selecVariation.product_variation_id}`)            
        }
    }

    // Consulta a BD para borrar un producto 
    const handleDelete = () => {
        axios
            .put(`http://localhost:4000/product/deleteProduct/${product.product_id}`)
            .then((res) => {
                navigate('/home');
            })
            .catch((error) => console.log(error));
    }

    return (
        <Row className="d-flex  justify-content-center align-items-center mt-5">
            <Col className="d-flex  flex-wrap justify-content-center align-items-center gap-3">
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>{product?.product_name}</Card.Title>

                        <Card.Text>
                            {product?.remarks}
                        </Card.Text>
                        <Card.Text>
                            <select class="form-select" aria-label="Default select example"
                                name="product_variation_id" value={selecVariation?.product_variation_id} onChange={handleChange} >
                                <option selected>Seleccione una variación</option>
                                {variations?.map((variation) => {
                                    return (
                                        <option key={variation.product_variation_id}
                                            value={variation.product_variation_id}
                                        >
                                            {variation.product_variation_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </Card.Text>
                        {message && <Alert variant="danger">{message}</Alert>}
                         
                        <div className='d-flex flex-wrap gap-1'>
                            <Button variant="primary" onClick={handleSubmit}>Ver variación</Button>
                            <Button variant="secondary" onClick={() => { navigate(`/editProduct/${product.product_id}`) }}>Editar</Button>                             
                            <Button variant="danger" onClick={handleDelete}>Borrar Producto</Button>
                        </div>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
