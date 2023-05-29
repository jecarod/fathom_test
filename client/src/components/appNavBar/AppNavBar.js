import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { deleteLocalStorage } from "../../helpers/localStorage/localStorage";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

export const AppNavBar = () => {
    const navigate = useNavigate();
    const { user, setUser, setIsLogged, setToken } = useContext(AppContext);

    // Función para desloguear
    const onLogOut = () => {
        deleteLocalStorage();
        setUser();
        setIsLogged(false);
        setToken();
        navigate("/");
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                {user ?
                    <>
                        <Navbar.Brand as={Link} to="/home">
                            Eciglogística
                        </Navbar.Brand>
                    </>
                    :
                    <>
                        <Navbar.Brand as={Link} to="/">
                            Eciglogística
                        </Navbar.Brand>
                    </>
                }

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        {user &&
                            <>                                
                                <Nav.Link as={Link} to="/newProduct">
                                    Nuevo Producto
                                </Nav.Link>
                                <Nav.Link as={Link} to="/newVariation">
                                    Nueva Variación
                                </Nav.Link>


                            </>
                        }
                    </Nav>
                    {user &&
                        <div className="d-flex justify-content-center">
                            <Button
                                variant="outline-dark"
                                onClick={onLogOut}
                            >LogOut</Button>
                        </div>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
