const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class userController {
	 
	// Controlador para insertar en BD un nuevo usuario
	createUser = (req, res) => {
		const { name, lastname, email, password } = req.body;

		let saltRounds = 8;
		bcrypt.genSalt(saltRounds, function (err, saltRounds) {
			bcrypt.hash(password, saltRounds, function (err, hash) {
				let sql = `INSERT INTO user (name, lastname, email, password) VALUES ( '${name}', '${lastname}', '${email}', '${hash}')`;

				connection.query(sql, (error, result) => {
					console.log(error);
					error
						? res.status(400).json({ error })
						: res.status(201).json(result);
				});
			});
		});
	};

	// Controldador para hacer el login de usuario  
	login = (req, res) => {
		let { email, password } = req.body;
		 
		let sql = `SELECT * FROM user WHERE email = '${email}'`;

		connection.query(sql, (error, result) => {
			 

			//En caso de error en la consulta
			if (error) return res.status(400).json(error);

			//En caso de no encontrar un user con dicho user_name o mail.
			if (!result || !result.length || result[0].is_deleted == 1) {
				res.status(401).json("Usuario no registrado");
			}
			else {
				//En caso de que el mail o user_name SEA correcto				 
				const [user] = result;
				const hash = user.password;

				//Capturo el user_id
				const user_id = user.user_id;

				//Comprobar contraseñas
				bcrypt.compare(password, hash, (error, response) => {
					if (error) return res.status(400).json(error);
					//   //si las contraseñas coinciden
					if (response === true) {
						const token = jwt.sign(
							{
								user: {
									email: user.email,
									name: user.name,
									id: user_id
								},
							},
							process.env.SECRET,
							{ expiresIn: "10d" }
						);
						res.status(200).json({ token, user: result[0] });
						//     //si las contraseñas coinciden
					} else {
						res.status(401).json("Usuario y contraseña incorrectos");
					}
				});
			}
		});
	};

}

module.exports = new userController();
