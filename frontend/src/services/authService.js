import api from "./api";

export const registerUser = async (name, email, password) => {
  const response = await api.post("/api/auth/register", {
    name,
    email,
    password,
    firebaseUid: "temp123"
  });

  return response.data;
};


export const sendMessageToAI = async (message) => {
  const response = await api.post("/api/ai/chat", {
    message,
  });

  return response.data;
};


export const loginUser = async (email, password) => {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};