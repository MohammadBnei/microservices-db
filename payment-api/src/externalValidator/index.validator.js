import { validatePayment } from './product.validator'
import { validateUser } from './user.validator'

export default (token) => {
    return {
        validatePayment: validatePayment(token),
        validateUser: validateUser(token)
    }
}