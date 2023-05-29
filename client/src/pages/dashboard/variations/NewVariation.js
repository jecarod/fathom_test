import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialValue = {
	name: "",
	product_variation_id:""
};

export const NewVariation = () => {
	const [variation, setVariation] = useState(initialValue);
	const [products, setProducts] = useState([]);
	// const [product_id, setProduct_id] = useState();
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	// Consulta a BD para traer info de todos los productos
	useEffect(() => { 
		axios
			.get(`http://localhost:4000/product/allProducts`)
			.then((res) => {				 
				setProducts(res.data);
			})
			.catch((error) => console.log(error));

	}, []);

	// Manejo de los campos del formulario
	const handleChange = (e) => {
		const { name, value } = e.target;		 
		setVariation({ ...variation, [name]: value });
	};	

	// Manejo del botón enviar. Consulta a BD para añadir una nueva variación
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!variation.name || !variation.product_id) {
			setMessage("Debe completar todos los campos");
		} else {
			axios
				.post(`http://localhost:4000/variation/newVariation`, variation)
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
						<Form.Label>Nombre de la variación</Form.Label>
						<Form.Control
							type="text"
							placeholder="Nombre de la variación"
							autoComplete="off"
							name="name"
							value={variation.name}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Seleccione un producto</Form.Label>
						<select class="form-select" aria-label="Default select example"
							name="product_id" value={variation.product_id} onChange={handleChange}>
							<option selected>Seleccione un producto</option>
							{products?.map((product) => {
								return(
									<option key={product.product_id}											
											value={product.product_id}											 
											>
											{product.product_name}
									</option>
								)
							})}							
						</select>
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
