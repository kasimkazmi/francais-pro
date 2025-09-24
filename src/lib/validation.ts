import { z } from 'zod';

// Auth form validation schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Validation helper functions
export const validateLogin = (data: unknown) => {
  return loginSchema.safeParse(data);
};

export const validateSignup = (data: unknown) => {
  return signupSchema.safeParse(data);
};

export const validateForgotPassword = (data: unknown) => {
  return forgotPasswordSchema.safeParse(data);
};

// Get first validation error message
export const getFirstValidationError = (error: { issues: Array<{ message: string }> }): string => {
  const firstError = error.issues[0];
  return firstError?.message || 'Validation error';
};

// Get all validation error messages
export const getAllValidationErrors = (error: { issues: Array<{ message: string }> }): string[] => {
  return error.issues.map((err: { message: string }) => err.message);
};