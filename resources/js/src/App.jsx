import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Button from "./components/Button";
import Admin from "./pages/admin/admin";
import OrderList from "./pages/user/order_list";
import ProductsList from "./pages/user/product_list";

function App() {
    const [activeButton, setActiveButton] = useState("admin");
    const navigate = useNavigate();

    const handleClick = (button) => {
        setActiveButton(button);

        if (button === "user") {
            navigate("/order_list");
        } else {
            navigate("/");
        }
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    maxWidth: "400px",
                    margin: "20px auto",
                    flexWrap: "wrap",
                }}
            >
                <Button
                    text="Admin"
                    active={activeButton === "admin"}
                    onClick={() => handleClick("admin")}
                />

                <Button
                    text="User"
                    active={activeButton === "user"}
                    onClick={() => handleClick("user")}
                />
            </div>

            <Routes>
                <Route path="/" element={<Admin />} />
                <Route path="/order_list" element={<OrderList />} />
                <Route path="/product_list" element={<ProductsList></ProductsList>} />
            </Routes>
        </>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
