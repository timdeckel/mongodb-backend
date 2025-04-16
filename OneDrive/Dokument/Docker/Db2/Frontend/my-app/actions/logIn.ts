'use server'
import { ServerActionResponse, handleAxiosError } from "@/lib/errorHandeling";
import { LogInSchema, LogInValues } from "@/lib/schemas";
import { redirect } from "next/navigation";
import {client} from '@/lib/clients'
import { auth } from "@/lib/auth";

export const LogIn = async (data:LogInValues):Promise<ServerActionResponse> => {
    console.log("hello school")
    try {
        const parseData = LogInSchema.parse(data)

        const response = await client.post('/auth/login', parseData)
        await auth.setAccessToken(response.data.accesstoken)

    }catch (error) {
        return handleAxiosError(error)
    }
    
    redirect("/")
}