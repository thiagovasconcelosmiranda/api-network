import {z} from 'zod';

export const signupSchema = z.object({
   name: z.string().min(0, 'Name é obrigatório'),
   email: z.string().min(2, 'Email invalido'),
   password: z.string().min(4, 'Pelo menos 4 caracteres')
});