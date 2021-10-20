import jwt from "jsonwebtoken"
import externalValidator from '../externalValidator/index.validator'
import { patchProduct } from "../externalValidator/product.validator";
import debug from 'debug';

const DEBUG = debug('dev');

export default async (productId, payed, buyerId, currentUser) => {
    let product = null
    let updated = false

    const token = jwt.sign(currentUser, process.env.JWT_KEY)
    try {

        const { validatePayment, validateUser } = externalValidator(token)

        product = await validatePayment(productId, payed)

        await patchProduct(productId, token, { quantity: product.quantity - 1 })
        updated = true
        await validateUser(buyerId)

    } catch (error) {
        DEBUG(error)
        if (product && updated) {
            await patchProduct(productId, token, { quantity: product.quantity })
        }
        throw new Error("Something went wrong with the payment")
    }
}