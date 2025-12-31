import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    CircularProgress,
    Typography,
    Button,
    Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate("/product_list"); // Replace with your product list route
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get("/api/orders");
            if (res.data.success) {
                setOrders(res.data.data);
            } else {
                setError("Failed to load orders");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "processing":
                return "warning";
            case "pending":
                return "error";
            case "shipped":
                return "primary";
            case "delivered":
                return "success";
            case "cancelled":
                return "error";
            default:
                return "default";
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;


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
                        Products
                    </Button>
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.product.name}</TableCell>
                                    <TableCell>${row.product.price}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>
                                        <Chip label={row.status} color={getStatusColor(row.status)} size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default OrdersTable;
