import React, { useEffect, useState } from "react";
import { Container, Button, Card, CardActions, CardContent, Grid, Typography, Badge, Chip, Stack } from "@mui/material";
import { getAllOrders, getAllOrdersByUser, deleteOrder, confirmOrder, cancelOrder, getDishById } from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState({}); // Store dishes information
  const [role, setRole] = useState(""); // Role state for the current user

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setRole(userData.role); // Extract role from user data in localStorage
    } else {
      console.error("User data not found in localStorage.");
    }
  }, []); // Runs once when the component is mounted

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let allOrders = [];

        // Fetch orders based on the role
        if (role === "user") {
          console.log("user");
          const userData = JSON.parse(localStorage.getItem("user"));
          const userId = userData?.id;

          if (userId) {
            allOrders = await getAllOrdersByUser(userId);
          } else {
            console.error("User ID not found in localStorage.");
          }
        } else {
          allOrders = await getAllOrders(); // Fetch all orders for admin
        }

        // Retrieve saved orders from localStorage (if any)
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

        // Merge saved orders with the newly fetched orders
        const ordersWithStatus = allOrders.map((order) => {
          const savedOrder = savedOrders.find((saved) => saved._id === order._id);
          return savedOrder ? { ...order, status: savedOrder.status } : order;
        });

        setOrders(ordersWithStatus);

        // Fetch dish details for each order (optional)
        const dishIds = allOrders.flatMap((order) => order.dishes.map((dish) => dish.dish_id));
        const uniqueDishIds = [...new Set(dishIds)];

        const dishData = {};
        for (let dishId of uniqueDishIds) {
          const dishDetails = await getDishById(dishId); // Assuming this API call exists to fetch dish details
          dishData[dishId] = dishDetails;
        }

        setDishes(dishData);
      } catch (error) {
        console.error("Error fetching orders or dish data:", error);
      }
    };

    if (role) {
      fetchOrders(); // Fetch orders once the role is set
    }
  }, [role]);

  const handleApprove = async (orderId) => {
    try {
      await confirmOrder(orderId);
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          const updatedOrder = { ...order, status: "approved" };
          localStorage.setItem("orders", JSON.stringify([...orders.filter((o) => o._id !== orderId), updatedOrder]));
          return updatedOrder;
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          const updatedOrder = { ...order, status: "canceled" };
          localStorage.setItem("orders", JSON.stringify([...orders.filter((o) => o._id !== orderId), updatedOrder]));
          return updatedOrder;
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card
              sx={{
                backgroundColor:
                  order.status === "confirmed" || order.status === "approved"
                    ? "lightgreen"
                    : order.status === "canceled"
                    ? "lightcoral"
                    : "white",
                color: order.status === "approved" || order.status === "canceled" ? "black" : "black",
                transition: "background-color 0.3s ease",
              }}
            >
              <CardContent>
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography variant="body1">Customer: {order.customer_name}</Typography>
                <Typography variant="body2">
                  Dishes:
                  <Stack direction="row" spacing={1}>
                    {order.dishes.map((dish, index) => (
                      <span key={index}>
                        {dishes[dish.dish_id] ? (
                          <Chip label={`${dishes[dish.dish_id].name} (x${dish.quantity})`} />
                        ) : null}
                      </span>
                    ))}
                  </Stack>
                </Typography>

                <Typography variant="body2">Status: {order.status ? order.status : "Pending"}</Typography>

                <Badge
                  color={order.status === "approved" ? "success" : order.status === "canceled" ? "error" : "default"}
                  badgeContent={order.status ? order.status : "Pending"}
                  sx={{ position: "absolute", top: 16, right: 16 }}
                />
              </CardContent>

              <CardActions>
                {role === "user" && (
                  <>
                    <Button
                      size="small"
                      color="success"
                      disabled={order.status === "approved" || order.status === "canceled"}
                      onClick={() => handleApprove(order._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      disabled={order.status === "approved" || order.status === "canceled"}
                      onClick={() => handleCancel(order._id)}
                    >
                      Cancel
                    </Button>
                  </>
                )}

                {role === "admin" && (
                  <>
                    <Button
                      size="small"
                      color="success"
                      disabled={order.status === "approved" || order.status === "canceled"}
                      onClick={() => handleApprove(order._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      disabled={order.status === "approved" || order.status === "canceled"}
                      onClick={() => handleCancel(order._id)}
                    >
                      Cancel
                    </Button>
                    <Button size="small" color="secondary" onClick={() => handleDelete(order._id)}>
                      Delete
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders;
