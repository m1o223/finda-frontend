import api from "./api";

export const registerUser = async (name, email, password) => {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
    firebaseUid: "temp123",
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const sendMessageToAI = async (message) => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};