import axios from "axios"

import debug from 'debug';
const DEBUG = debug('dev');

const userApiURL = process.env.USER_API_URL

export const fetchUser = async (userId, token) => {
    try {
        const { data } = (await axios.get(`${userApiURL}users/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })).data

        const user = data?.user

        if (user?.id === userId) {
            return user
        }
    } catch (error) {
        DEBUG(error);
        throw new Error('User not found')
    }
}

export const validateUser = (token) => async (userId) => {
    const user = await fetchUser(userId, token)

    return !!user
}