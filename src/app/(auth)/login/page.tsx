// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Placeholder login function - replace with actual authentication logic
  // Inside onSubmit in src/app/(auth)/login/page.tsx
// src/app/(auth)/login/page.tsx
const onSubmit = async (data: LoginFormValues) => {
  try {
    // Correct endpoint to /api/auth/login
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Required for cookies
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast({ title: 'Login Successful', description: 'Welcome back!' });
      window.location.href = '/'; // Full page reload to update state
    } else {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }
  } catch (error: any) {
    toast({
      variant: 'default',
      title: 'Login Failed',
      description: error.message,
    });
    console.log(error);
    form.resetField('password');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-15rem)] py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                        disabled={isLoading}
                       />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        autoComplete="current-password"
                         {...field}
                        disabled={isLoading}
                       />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit" className="w-full" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 {isLoading ? 'Logging in...' : 'Login'}
               </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
            <div className="mt-4 text-center">
             Don't have an account?{' '}
             <Button variant="link" asChild className="p-0 h-auto">
               <Link href="/signup">
                 Sign up
               </Link>
             </Button>
            </div>
           <div className="mt-2 text-center">
                <Button variant="link" asChild className="p-0 h-auto text-xs">
                    <Link href="/forgot-password"> {/* reminder - Have to Create forgot password page */}
                        Forgot password?
                    </Link>
                </Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
