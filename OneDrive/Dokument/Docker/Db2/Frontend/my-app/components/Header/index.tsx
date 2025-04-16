import Link from "next/link"
import Logo from  '@/assets/logo.png'
import Image from 'next/image'
import { auth } from "@/lib/auth"
import LogOutButton from "../LogOut"

const Header = async () => {
    const user = await auth.getAccsessToken();
    return (
        <header className="flex p-6 bg-pink-300 justify-between h-10 items-center content-center">
            <Image src={Logo} alt="logo" className="w-auto h-6 flex"/>
            <div>
                 {user 
                    ?  <LogOutButton/>
                    : <Link className="button" href="/auth/login">Login</Link>
                 }
            </div>           
        </header>
    )
}

export default Header