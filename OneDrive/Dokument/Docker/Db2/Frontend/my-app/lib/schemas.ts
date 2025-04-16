import {z} from 'zod'

export const SignUpSchema = z.object(
    {
        username: z.string().min(6, "username needs to be atleast 6 caracters"),
        password: z.string().min(6, "pasword needs to be atleast 6 caracters")
    }
)

export const LogInSchema = z.object(
    {
        username: z.string().min(1, "username needs to be atleast 1 caracters"),
        password: z.string().min(1, "pasword needs to be atleast 1 caracters")
    }
)

export type SignUpValues = z.infer<typeof SignUpSchema> 
export type LogInValues = z.infer<typeof LogInSchema> 
