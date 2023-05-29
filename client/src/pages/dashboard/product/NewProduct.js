import axios from "axios";
import React, { useState } from "react";
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialValue = {
	name: "",
	remarks: "",
};

export const NewProduct = () => {
	const [product, setProduct] = useState(initialValue);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	// Manejo de los campos del formulario
	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	// Consulta a BD para crear un nuevo producto
	const handleSubmit = (e) => {
		e.preventDefault();

		// Controlar que los campos se han completado
		if (!product.name || !product.remarks) {
			setMessage("Debe completar todos los campos");
		} else {
			axios
				.post(`http://localhost:4000/product/newProduct`, product)
				.then((res) => {					 
					navigate('/home');
				})
				.catch((error) => console.log(error));
		}
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
							autoComplete="off"
							name="name"
							value={product.name}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Observaciones</Form.Label>
						<Form.Control
							type="text"
							placeholder="Observaciones"
							autoComplete="off"
							name="remarks"
							value={product.remarks}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{message && <Alert variant="danger">{message}</Alert>}

					<Button variant="primary" type="submit" onClick={handleSubmit}>
						Nuevo
					</Button>
				</Form>
			</Col>
		</Row>
	);
};
