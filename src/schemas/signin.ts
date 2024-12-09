import {z} from 'zod'

export const signinSchema = z.object({
  email: z.string().min(0, 'Email obrigatório'),
  password: z.string().min(2, 'Pelo menos 4 caracteres')
});