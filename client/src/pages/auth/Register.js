import axios from "axios";
import React, { useState } from "react";
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialValue = {
    name: "",
    lastname: "",
    email: "",
    password: "",
};
export const Register = () => {
    const [register, setRegister] = useState(initialValue);
    // Mensaje al usuario
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Manejo de los campos del formulaior
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({ ...register, [name]: value });

    }

    // Manejo del botón de envío del formulaior
    const handleSubmit = (e) => {
        e.preventDefault();
        // Comprobar si los campos del formulario se han completado
        if (!register.name || !register.lastname || !register.email || !register.password) {
            setMessage("Es necesario cumplimentar todos los campos");
        }
        else {
            axios
                .post('http://localhost:4000/users/createUser', register)
                .then((res) => { 
                    // Redirección al login                    
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error)
                    setMessage("Ha ocurrido un error")
                }
                )
        }
    }

    return (

        <Row className="d-flex justify-content-center align-items-center mt-5">
            <Col md={6} className="d-flex justify-content-center align-items-center">
                <Form className="w-75">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre"
                            autoComplete="off"
                            name="name"
                            value={register.name}
                            onChange={handleChange}
                            required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control type="text" placeholder="Apellidos"
                            autoComplete="off"
                            name="lastname"
                            value={register.lastname}
                            onChange={handleChange}
                            required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email"
                            autoComplete="off"
                            name="email"
                            value={register.email}
                            onChange={handleChange}
                            required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            autoComplete="off"
                            name="password"
                            value={register.password}
                            onChange={handleChange}
                            required />
                    </Form.Group>

                    {message && <Alert variant="danger">{message}</Alert>}
                    <div className='d-flex flex-wrap gap-1'>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Registrarse
                        </Button>
                        <Button variant="secondary" type="submit" onClick={() => navigate('/')}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>

    );
};
