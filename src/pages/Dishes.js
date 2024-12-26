import React, { useState, useEffect } from "react";
import { createDish, updateDish, deleteDish, getAllDishes, createOrder } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const Dishes = () => {
  const { user } = useAuth();
  const [dishes, setDishes] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentDish, setCurrentDish] = useState(null);
  const [newDish, setNewDish] = useState({ name: "", price: "" });
  const [orderQuantities, setOrderQuantities] = useState({});
  const [cart, setCart] = useState([]); // Track selected dishes in cart

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await getAllDishes();
        setDishes(response.data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  const handleOpenAddModal = () => {
    setNewDish({ name: "", price: "" });
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenEditModal = (dish) => {
    setCurrentDish(dish);
    setNewDish({ name: dish.name, price: dish.price });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleCreateDish = async () => {
    try {
      await createDish(newDish.name, newDish.price);
      setOpenAddModal(false);
      setNewDish({ name: "", price: "" });
      const response = await getAllDishes();
      setDishes(response.data);
    } catch (error) {
      console.error("Error creating dish:", error);
    }
  };

  const handleUpdateDish = async () => {
    try {
      if (currentDish && currentDish._id) {
        await updateDish(currentDish._id, newDish.name, newDish.price);
        setOpenEditModal(false);
        setCurrentDish(null);
        setNewDish({ name: "", price: "" });
        const response = await getAllDishes();
        setDishes(response.data);
      }
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      await deleteDish(id);
      const updatedDishes = dishes.filter((dish) => dish._id !== id);
      setDishes(updatedDishes);
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  // Handle adding dish to the cart
  const handleAddToCart = (dishId) => {
    const quantity = orderQuantities[dishId] || 1; // Get quantity for the specific dish
    if (quantity > 0) {
      const newCart = [...cart];
      const dishInCart = newCart.find((item) => item.dishId === dishId);
      if (dishInCart) {
        // Update quantity if dish is already in the cart
        dishInCart.quantity += quantity;
      } else {
        // Add new dish to cart
        newCart.push({ dishId, quantity });
      }
      setCart(newCart); // Update cart
      setOrderQuantities((prev) => ({ ...prev, [dishId]: 1 })); // Reset the quantity for that dish
    }
  };

  // Handle removing dish from the cart
  const handleRemoveFromCart = (dishId) => {
    const newCart = cart.filter((item) => item.dishId !== dishId);
    setCart(newCart);
  };

  // Handle confirming the order
  const handleConfirmOrder = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("User not found in localStorage");
      return;
    }

    const user = JSON.parse(storedUser);
    const customerName = user.username || user.id;

    if (!customerName) {
      alert("Customer name (ID) is missing from the user data");
      return;
    }

    // Create order data
    const dishesData = cart.map((item) => ({
      dish_id: item.dishId,
      quantity: item.quantity,
    }));

    const orderData = {
      customer_name: customerName,
      dishes: dishesData,
    };

    try {
      await createOrder(orderData);
      alert("Order placed successfully!");
      setCart([]); // Clear cart after placing the order
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order");
    }
  };

  // Calculate total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const dish = dishes.find((d) => d._id === item.dishId);
      return total + (dish ? dish.price * item.quantity : 0);
    }, 0);
  };

  return (
    <Container maxWidth="xl">
      <h2>Dishes</h2>

      {/* Admin specific functionality */}
      {user && user.role === "admin" && (
        <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
          Add Dish
        </Button>
      )}

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{dish.name}</Typography>
                <Typography variant="body1">Price: ${dish.price}</Typography>
              </CardContent>
              <CardActions>
                {user && user.role !== "admin" && (
                  <>
                    <TextField
                      label="Quantity"
                      type="number"
                      value={orderQuantities[dish._id] || 1}
                      onChange={(e) => setOrderQuantities((prev) => ({ ...prev, [dish._id]: e.target.value }))}
                      inputProps={{ min: 1 }}
                    />
                    <Button size="small" color="primary" onClick={() => handleAddToCart(dish._id)}>
                      Add to Cart
                    </Button>
                  </>
                )}

                {/* Admin controls */}
                {user && user.role === "admin" && (
                  <>
                    <Button size="small" color="primary" onClick={() => handleOpenEditModal(dish)}>
                      Edit
                    </Button>
                    <Button size="small" color="secondary" onClick={() => handleDeleteDish(dish._id)}>
                      Delete
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div>
          <h3>Your Cart</h3>
          <Grid container spacing={2}>
            {cart.map((item) => {
              const dish = dishes.find((d) => d._id === item.dishId);
              return (
                <Grid item xs={12} sm={6} md={4} key={item.dishId}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{dish?.name}</Typography>
                      <Typography variant="body2">Quantity: {item.quantity}</Typography>
                      <Typography variant="body2">Price: ${dish?.price * item.quantity}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="error" onClick={() => handleRemoveFromCart(item.dishId)}>
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <div>
            <Typography variant="h6">Total: ${calculateTotal()}</Typography>
            <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
              Confirm Order
            </Button>
          </div>
        </div>
      )}

      {/* Add Dish Dialog */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle>Add Dish</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Dish Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateDish} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dish Dialog */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Dish</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Dish Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateDish} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dishes;
