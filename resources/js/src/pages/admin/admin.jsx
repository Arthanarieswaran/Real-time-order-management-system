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
    Typography,
    Chip,
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box
} from "@mui/material";

const Admin = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [orders, setOrders] = useState([]);

    // Modal state
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const fetchOrders = async () => {
        try {
            const response = await axios.get("/api/orders");
            if (response.data.success) {
                setData(response.data.data);
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

    useEffect(() => {
        window.Echo
            .channel('orders')
            .listen('.order.placed', (e) => {
                console.log('Admin received new order', e.order);

                setData((prev) => [e.order, ...prev]);
            });

        return () => {
            window.Echo.leave('orders');
        };
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

    // Open modal
    const handleEditClick = (order) => {
        setSelectedOrder(order);
        setNewStatus(order.status);
        setOpen(true);
    };

    // Close modal
    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    // Update status API call
    const handleUpdateStatus = async () => {
        try {
            await axios.put(`/api/updateStatus/${selectedOrder.id}`, {
                status: newStatus,
            });
            fetchOrders();
            handleClose();
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" align="center" gutterBottom>
                {error}
            </Typography>
        );
    }

    return (
        <>
            <Box p={4}>
                <Typography variant="h4" gutterBottom>
                    Client Order Summary
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Price ($)</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {new Date(row.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.product.name}</TableCell>
                                    <TableCell>${row.product.price}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            color={getStatusColor(row.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleEditClick(row)}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Edit Status Modal */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Order Status</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={newStatus}
                                label="Status"
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="processing">Processing</MenuItem>
                                <MenuItem value="shipped">Shipped</MenuItem>
                                <MenuItem value="delivered">Delivered</MenuItem>
                                <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleUpdateStatus}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

export default Admin;
