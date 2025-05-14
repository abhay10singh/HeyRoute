'use client';
require('dotenv').config();
import type { ReactNode } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';

// Ensure the environment variable is correctly processed.
// It should be prefixed with NEXT_PUBLIC_ to be available on the client-side.
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
  console.warn(
    'Google Maps API key is missing. Maps functionality will be disabled. ' +
    'Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.'
  );
}

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Only wrap with APIProvider if the key exists
  if (googleMapsApiKey) {
    return <APIProvider apiKey={googleMapsApiKey}>{children}</APIProvider>;
  }

  // If no API key, render children without the provider
  return <>{children}</>;
}
