// src/app/(auth)/signup/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { Message } from 'genkit'

// validation schema
const signupSchema = z
  .object({
    name : z.string().min(1,{ message : " You name should Have atleast 1 Character "}).max(100, {message : " You name Can have at max 100 Character "}),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z
      .string()
      .min(8, { message: 'At least 8 characters.' })
      .regex(/[a-z]/, { message: 'One lowercase letter.' })
      .regex(/[A-Z]/, { message: 'One uppercase letter.' })
      .regex(/[0-9]/, { message: 'One number.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '',email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name : data.name ,email: data.email, password: data.password }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Signup failed')
      toast({ title: 'Account created!', description: 'Please log in.' })
      router.push('/login')
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: err.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-15rem)] py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Enter your email and password.</CardDescription>
        </CardHeader>
        <CardContent>
 <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    {(['name', 'email', 'password', 'confirmPassword'] as const).map((name) => (
      <FormField
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="capitalize">
              {name.replace(/([A-Z])/g, ' $1')}
            </FormLabel>
            <FormControl>
              <Input
                type={
                  name === 'email'
                    ? 'email'
                    : name === 'name'
                    ? 'text' // Set 'text' type for the name field
                    : 'password' // Set 'password' type for password and confirmPassword fields
                }
                autoComplete={
                  name === 'email'
                    ? 'email'
                    : name === 'name'
                    ? 'name' // Use 'name' for the name field
                    : 'new-password' // Use 'new-password' for password fields
                }
                placeholder={
                  name === 'email'
                    ? 'you@example.com'
                    : name === 'name'
                    ? 'Your Name' // Placeholder for the name field
                    : '••••••••'
                }
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? 'Creating Account...' : 'Sign Up'}
    </Button>
  </form>
</Form>
</CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
          <div className="mt-4 text-center">
            Already have an account?{' '}
            <Link href="/login">
              <Button variant="link" className="p-0 h-auto">Log in</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
