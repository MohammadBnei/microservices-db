import client from "../config/database.config";

export const createReservation = async (productId) => {
  const currentReservation = Number((await getReservation(productId)) || 0)
  await client.set(productId, `${currentReservation ? currentReservation + 1 : 1}`)
}

export const getReservation = (productId) => {
  return client.get(productId)
}

export const deleteReservation = async (productId) => {
  const currentReservation = await getReservation(productId)
  await client.set(productId, `${currentReservation > 0 ? currentReservation - 1 : 0}`)
}

