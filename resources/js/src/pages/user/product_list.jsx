import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
    Button,
    IconButton,
    Badge,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const ProductsList = ({ currentUserId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState({});

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate("/order_list");
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get("/api/products");
            if (res.data.success) {
                setProducts(res.data.data);
            } else {
                setError("Failed to load products");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = (productId) => {
        setCart((prev) => ({
            ...prev,
            [productId]: prev[productId] ? prev[productId] + 1 : 1,
        }));
    };

    const handleBuy = async (productId) => {
        const quantity = cart[productId] || 1; // default 1 if not in cart
        try {
            const payload = {
                user_id: currentUserId, // dynamic user_id
                product_id: productId,
                quantity: quantity,
            };
            const res = await axios.post("http://127.0.0.1:8000/api/orders", payload);

            if (res.data.success) {
                alert("Order placed successfully!");
                // Optionally reset cart count for this product
                setCart((prev) => ({ ...prev, [productId]: 0 }));
            } else {
                alert("Failed to place order");
            }
        } catch (err) {
            console.error(err);
            alert("Error placing order");
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    const placeholderImage = "/images/image.png";

    return (
        <>

            <Box p={4}>
                <Typography variant="h4" gutterBottom>
                    Your Order Summary
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2 }}
                        onClick={handleEditClick}
                    >
                        Orders List
                    </Button>
                </Typography>
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.image || placeholderImage}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary">
                                        ${product.price}
                                    </Typography>

                                    {/* Cart & Buy */}
                                    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleAddToCart(product.id)}
                                        >
                                            <Badge badgeContent={cart[product.id] || 0} color="secondary">
                                                <ShoppingCartIcon />
                                            </Badge>
                                        </IconButton>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ marginLeft: "10px" }}
                                            onClick={() => handleBuy(product.id)}
                                        >
                                            Buy
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>

    );
};

export default ProductsList;
