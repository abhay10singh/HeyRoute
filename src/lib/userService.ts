import { ObjectId } from 'mongoose';
import { headers } from 'next/headers';

export type UserProfile = {
  id: ObjectId;
  name: string;
  email: string;
  // add other fields as needed
};

export async function fetchProfile(): Promise<UserProfile> {
  try {
    let url = '/api/user/me';
    let fetchOptions: RequestInit = {
      cache: 'no-store',
      credentials: 'include'
    };

    if (typeof window === 'undefined') {
      const headersList = headers();
      const host = headersList.get('host') || 'localhost:3000';
      const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
      url = `${protocol}://${host}/api/user/me`;
      
      // Forward all cookies from the incoming request
      const cookie = headersList.get('cookie') || '';
      fetchOptions.headers = { cookie };
    }

    const res = await fetch(url, fetchOptions);
    
    if (res.status === 401) {
      // Clear invalid token client-side
      if (typeof window !== 'undefined') {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      }
      throw new Error('Not authenticated');
    }
    
    if (!res.ok) throw new Error('Failed to fetch profile');

    return await res.json();
  } catch (error) {
    console.error('Fetch profile error:', error);
    throw error;
  }
}