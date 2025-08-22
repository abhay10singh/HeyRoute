'use client';
require('dotenv').config();
import type { ReactNode } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { UserProfile } from '@/lib/userService';
import { createContext, useEffect, useState } from 'react';


type AuthContextType = {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});


const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
  console.warn(
    'Google Maps API key is missing. Maps functionality will be disabled. ' +
    'Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.'
  );
}

interface ProvidersProps {
  children: ReactNode;
  initialUser?: UserProfile | null;
}

export default function Providers({ children, initialUser }: ProvidersProps) {

  const [user, setUser] = useState<UserProfile | null>(initialUser || null);


useEffect(() => {
  async function validateSession() {
    try {
      const res = await fetch('/api/user/me', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
     console.log(res); 
      if (res.status === 401) {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        throw new Error('Unauthorized');
      }
      
      const userData = await res.json();
      setUser(userData);
    } catch {
      setUser(null);
    }
  }


  validateSession();
}, []);


  const BaseProviders = ({ children }: { children: ReactNode }) => (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );


  return (
    <BaseProviders>
      {googleMapsApiKey ? (
        <APIProvider apiKey={googleMapsApiKey}>{children}</APIProvider>
      ) : (
        children
      )}
    </BaseProviders>
  );
}