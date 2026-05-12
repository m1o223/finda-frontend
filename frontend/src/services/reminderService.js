import api from "./api"

export const getReminders = async () => {
  const { data } = await api.get("/api/reminders")
  return data
}

export const createReminder = async (reminderData) => {
  const { data } = await api.post("/api/reminders", reminderData)
  return data
}

export const updateReminder = async (id, reminderData) => {
  const { data } = await api.put(`/api/reminders/${id}`, reminderData)
  return data
}

export const deleteReminder = async (id) => {
  const { data } = await api.delete(`/api/reminders/${id}`)
  return data
}