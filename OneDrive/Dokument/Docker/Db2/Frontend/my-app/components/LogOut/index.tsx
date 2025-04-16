'use client'
import { LogOut } from "@/actions/logout"

const LogOutButton = () => {
    return <button onClick={() => LogOut()} className="button">Log Out</button>
}

export default LogOutButton