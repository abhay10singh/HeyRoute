'use client';

import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface ListingMapProps {
  lat: number;
  lng: number;
  title: string;
}

export default function ListingMap({ lat, lng, title }: ListingMapProps) {
  const position = { lat, lng };
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID; // Optional: Use a Map ID for custom styling

  // Check if API key is available (redundant check, handled in Providers, but good practice)
  const apiKeyAvailable = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKeyAvailable) {
     return (
      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
        Map requires API Key configuration.
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Map
        center={position}
        zoom={15}
        mapId={mapId} // Use your custom Map ID if you have one
        gestureHandling={'greedy'} // Allows smooth interaction on mobile
        disableDefaultUI={true} // Keep UI clean, add custom controls if needed
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker position={position} title={title}>
            {/* Use a themed Pin component */}
            <Pin
                background={'hsl(var(--primary))'} // Use primary theme color
                borderColor={'hsl(var(--primary-foreground))'}
                glyphColor={'hsl(var(--primary-foreground))'}
            />
        </AdvancedMarker>
      </Map>
    </div>
  );
}
