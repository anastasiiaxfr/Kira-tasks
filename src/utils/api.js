import axios from "axios";

const API_URL = "https://restaurant-youc.onrender.com";

// Создание экземпляра Axios с базовым URL
const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавление перехватчика запроса для включения токена авторизации (если нужно)
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Предполагаем, что токен хранится в localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Регистрация пользователя
export const registerUser = async (username, password, role) => {
  try {
    const response = await apiInstance.post("/register", { username, password, role });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Логин пользователя
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};
// Выход (удаление токена)
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// API calls for Dishes
export const createDish = async (name, price) => {
  try {
    const response = await apiInstance.post("/dishes", { name, price });
    return response.data;
  } catch (error) {
    console.error("Error creating dish:", error);
    throw error;
  }
};

export const updateDish = async (id, name, price) => {
  try {
    const response = await apiInstance.put(`/dishes/${id}`, { name, price });
    return response.data;
  } catch (error) {
    console.error("Error updating dish:", error);
    throw error;
  }
};

export const deleteDish = async (id) => {
  try {
    const response = await apiInstance.delete(`/dishes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting dish:", error);
    throw error;
  }
};

export const getDishById = async (id) => {
  try {
    const response = await apiInstance.get(`/dishes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dish:", error);
    throw error;
  }
};

export const getAllDishes = async () => {
  try {
    const response = await apiInstance.get("/dishes");
    return response.data;
  } catch (error) {
    console.error("Error fetching all dishes:", error);
    throw error;
  }
};

// API calls for Orders
export const createOrder = async (orderData) => {
  try {
    const response = await apiInstance.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await apiInstance.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const confirmOrder = async (id) => {
  try {
    const response = await apiInstance.post(`/orders/${id}/confirm`);
    return response.data;
  } catch (error) {
    console.error("Error confirming order:", error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await apiInstance.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await apiInstance.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};
