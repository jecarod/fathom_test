import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveLocalStorage } from "../../helpers/localStorage/localStorage";
import { AppContext } from "../../context/AppContext";

const initialValue = {
    email:"",
    password:""
}

export const Login = () => {
    const [login, setLogin] = useState(initialValue);
    const [message, setMessage] = useState("");
    const { setUser, user, setIsLogged } = useContext(AppContext);
    const navigate = useNavigate();

    // Manejo de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({...login, [name]:value});
    }

    // Manejo botón de envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Comprobar si los campos se han completado
        if(!login.email || !login.password){
            setMessage("Es necesario completar todos los campos")
        }
        else{            
            axios
                .post('http://localhost:4000/users/login', login)
                .then((res) => {                     
                    saveLocalStorage(res.data.token);
                    setIsLogged(true);
                    setUser(res.data);
                    navigate('/home');
                })
                .catch((error) => {                    
                    setMessage("Usuario o contraseña incorrectos")
                });
        }

    }
  return (
    <Row className="d-flex justify-content-center align-items-center mt-5">
        <Col md={6} className="d-flex justify-content-center align-items-center">
            <Form  className="w-75">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                type="email"
                placeholder="Email"
                autoComplete="off"
                name="email"
                value={login.email}
                onChange={handleChange}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="off"
                name="password"
                value={login.password}
                onChange={handleChange}
                required
                />
            </Form.Group>            

            {message && <Alert variant="danger">{message}</Alert>}

            <div className='d-flex flex-wrap gap-1'>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Login
            </Button>
            <Button variant="secondary" type="submit" onClick={() => navigate('/register')}>
                Registrarse
            </Button>
            </div>
            </Form>
        </Col>
    </Row>
  );
};
