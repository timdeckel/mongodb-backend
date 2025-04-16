import {cookies} from 'next/headers'
import 'server-only'

const setAccessToken = async(accesstoken: string) => {
    const cookieStore = await cookies();
    cookieStore.set('access-token', accesstoken, {httpOnly: true})
}

const getAccsessToken = async() => {
    const cookieStore = await cookies();
    return cookieStore.get('access-token')
}

const deleteAccessToken = async() => {
    const cookieStore = await cookies();
    cookieStore.delete('access-token')
}

export const auth = {
    setAccessToken,
    getAccsessToken,
    deleteAccessToken
}