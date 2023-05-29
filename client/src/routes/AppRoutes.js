import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AppNavBar } from "../components/appNavBar/AppNavBar";
import { Home } from "../pages/dashboard/home/Home";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { NewProduct } from "../pages/dashboard/product/NewProduct";
import { NewVariation } from "../pages/dashboard/variations/NewVariation";
import { VariationsProduct } from "../pages/dashboard/variations/VariationsProduct";
import { EditProduct } from "../pages/dashboard/product/EditProduct";
import { OneProduct } from "../pages/dashboard/product/OneProduct";
import { OneVariation } from "../pages/dashboard/variations/OneVariation";
import { EditVariation } from "../pages/dashboard/variations/EditVariation";
import { ErrorPage } from "../pages/error/ErrorPage";


export const AppRoutes = () => {
    const { user, isLogged, token } = useContext(AppContext);
    return (
        <Container fluid>
            <BrowserRouter>
                <AppNavBar />
                <Routes>
                    <Route path="*" element={<ErrorPage />} />
                    {!token && !isLogged && (
                        <>
                            <Route path="/" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </>
                    )}

                    {token && isLogged && (
                        <>
                            <Route path="/home" element={<Home />} />
                            <Route path="/newProduct" element={<NewProduct />} />
                            <Route path="/oneProduct/:product_id" element={<OneProduct />} />
                            <Route path="/editProduct/:product_id" element={<EditProduct />} />
                            <Route path="/newVariation" element={<NewVariation />} />
                            <Route path="/oneVariation/:product_variation_id" element={<OneVariation />} />
                            <Route path="/variationsProduct/:product_id" element={<VariationsProduct />} />
                            <Route path="/editVariation/:product_variation_id" element={<EditVariation />} />
                        </>
                    )} 
                </Routes>
            </BrowserRouter>
        </Container>
    );
};
