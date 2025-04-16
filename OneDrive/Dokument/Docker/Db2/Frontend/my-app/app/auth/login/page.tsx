import Link from "next/link"
import LoginForm from "./loginForm"


const Login = () => {
    return(
        <div>
           <h1>Login</h1> 
           <LoginForm/>
           <p>Dont have an account?<Link href="/auth/signup"/>Sign up here</p>
        </div>
        
    )
}

export default Login