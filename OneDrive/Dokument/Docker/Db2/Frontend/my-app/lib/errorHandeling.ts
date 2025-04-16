import { isAxiosError } from "axios"

export type ServerActionResponse = {
    error: string 
} | undefined | void

export const handleAxiosError = (error:unknown) => {
    const defaultError = "Something went wrong"
    if (!isAxiosError(error)) {
        return {error: defaultError}
    }
    return {error: error.response?.data.message} 
}

export const handleServerActionError = (response: ServerActionResponse) => {
    if (response?.error) {
        throw Error(response.error)
    }
}