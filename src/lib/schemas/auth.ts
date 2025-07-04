import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  rememberMe: z.boolean().default(false)
});

export type AuthSchema = typeof authSchema;
export type AuthInput = z.input<AuthSchema>;
export type AuthValues = z.infer<AuthSchema>; 