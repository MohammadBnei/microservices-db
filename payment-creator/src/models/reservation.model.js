import client from "../config/database.config";

export const createReservation = async (productId, quantityLeft) => {
  await client.set(productId, `${quantityLeft}`)
}

export const getReservation = (productId) => {
  return client.get(productId)
}

export const deleteReservation = (productId) => {
  return client.del(productId)
}

