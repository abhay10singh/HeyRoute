'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MapPin, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/components/providers';
import ThemeToggleButton from '../ui/theme-toggle-button';
import { HeyRouteIcon } from '../icons/heyRouteIcon';

export default function Header() {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

const handleLogout = async () => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    
    if (res.ok) {
      setUser(null);
      // Clear client-side cache
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      // Force complete refresh
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};


if (!isMounted) return null;


  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
         
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <span className="opacity-0">Loading</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
       <HeyRouteIcon/>
          <span className="text-xl font-bold tracking-tight text-foreground">
            HeyRoute
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/explore" className="text-muted-foreground transition-colors hover:text-foreground">
            Explore
          </Link>
          <Link href="/reviews" className="text-muted-foreground transition-colors hover:text-foreground">
            Reviews
          </Link>
          <Link href="/add-listing" className="text-muted-foreground transition-colors hover:text-foreground">
            Add Listing
          </Link>
           
        </nav>
       
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="mr-4 hidden sm:inline">Hello, {user.name}!</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                aria-label="Logout"
                className="min-w-[100px]"
              >
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="min-w-[90px]"
              >
                <Link href="/login" className="flex items-center">
                  <LogIn className="mr-1 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button 
                size="sm" 
                asChild
                className="min-w-[110px]"
              >
                <Link href="/signup" className="flex items-center">
                  <UserPlus className="mr-1 h-4 w-4" /> Sign Up
                </Link>
              </Button>
              <ThemeToggleButton   variant = 'gif' url = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnpwM2h0aDAzeHhnbHcxMDhkM3hoZTc0OTE3dmU1bXNoNHY2YXp3aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/I6GC6WHpBCJJvI0IVh/giphy.gif"/>
            </>
          )}
        </div>
      </div>
    </header>
  )
}