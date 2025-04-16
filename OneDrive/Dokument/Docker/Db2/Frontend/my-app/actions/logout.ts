'use server'
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export const LogOut = async () => {
    await auth.deleteAccessToken()
    redirect("/")
}