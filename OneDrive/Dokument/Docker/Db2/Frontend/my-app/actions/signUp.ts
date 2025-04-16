'use server'
import { ServerActionResponse, handleAxiosError } from "@/lib/errorHandeling";
import { SignUpSchema, SignUpValues } from "@/lib/schemas";
import { redirect } from "next/navigation";
import {client} from '@/lib/clients'

export const SignUp = async (data:SignUpValues):Promise<ServerActionResponse> => {
    try {
        const parseData = SignUpSchema.parse(data)

        await client.post('/auth/signup', parseData)
    }catch (error) {
        return handleAxiosError(error)
    }

    redirect("/auth/login")
}