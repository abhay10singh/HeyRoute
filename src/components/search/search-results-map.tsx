'use client';

import { Map as GoogleMap, AdvancedMarker, Pin, InfoWindow, useMap, useApiIsLoaded } from '@vis.gl/react-google-maps';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ListingSearchResult {
  id: string;
  name: string;
  type: 'Hotel' | 'Restaurant' | 'Attraction';
  rating: number;
  imageUrl: string;
  location: {
    addressSnippet: string;
    lat: number;
    lng: number;
  };
}

interface SearchResultsMapProps {
  listings: ListingSearchResult[];
}

function MapComponent({ listings }: SearchResultsMapProps) {
  const map = useMap();
  const [selectedMarker, setSelectedMarker] = useState<ListingSearchResult | null>(null);

  // Calculate bounds, center, zoom
  const { bounds, center, zoom } = useMemo(() => {
    if (!listings || listings.length === 0) {
      return { bounds: null, center: { lat: 26.907524, lng: 75.739639 }, zoom: 4 };
    }

    const newBounds = new google.maps.LatLngBounds();
    listings.forEach(listing => {
      newBounds.extend({ lat: listing.location.lat, lng: listing.location.lng });
    });
    const newCenter = newBounds.getCenter().toJSON();

    let newZoom = 15;
    if (listings.length > 1) {
      const ne = newBounds.getNorthEast();
      const sw = newBounds.getSouthWest();
      const latDiff = Math.abs(ne.lat() - sw.lat());
      const lngDiff = Math.abs(ne.lng() - sw.lng());
      const maxDiff = Math.max(latDiff, lngDiff);
      if (maxDiff > 0.01) newZoom = 14;
      if (maxDiff > 0.05) newZoom = 13;
      if (maxDiff > 0.1) newZoom = 12;
      if (maxDiff > 0.5) newZoom = 10;
      if (maxDiff > 2) newZoom = 8;
      if (maxDiff > 10) newZoom = 6;
    }

    return { bounds: newBounds, center: newCenter, zoom: newZoom };
  }, [listings]);

  // Imperative map updates
  useEffect(() => {
    if (!map) return;

    if (listings.length > 0 && bounds) {
      map.fitBounds(bounds, { padding: 100 });
      const listener = google.maps.event.addListenerOnce(map, 'idle', () => {
        const currentZoom = map.getZoom()!;
        if (listings.length === 1 && currentZoom > zoom) {
          map.setZoom(zoom);
        } else if (currentZoom > 18) {
          map.setZoom(18);
        }
      });
      return () => google.maps.event.removeListener(listener);
    } else {
      map.setCenter(center);
      map.setZoom(zoom);
    }
  }, [map, listings, bounds, center, zoom]);

  const handleMarkerClick = (listing: ListingSearchResult) => {
    setSelectedMarker(listing);
    if (map) {
      map.panTo({ lat: listing.location.lat, lng: listing.location.lng });
      if (map.getZoom()! < 15) map.setZoom(15);
    }
  };

  const handleInfoWindowClose = () => setSelectedMarker(null);

  return (
    <GoogleMap
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
      gestureHandling="greedy"
      disableDefaultUI
      style={{ width: '100%', height: '100%' }}
      reuseMaps
    >
      {listings.map(listing => (
        <AdvancedMarker
          key={listing.id}
          position={{ lat: listing.location.lat, lng: listing.location.lng }}
          title={listing.name}
          onClick={() => handleMarkerClick(listing)}
        >
          <Pin
            background={selectedMarker?.id === listing.id ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}
            borderColor="hsl(var(--primary-foreground))"
            glyphColor="hsl(var(--primary-foreground))"
            scale={selectedMarker?.id === listing.id ? 1.2 : 1}
          />
        </AdvancedMarker>
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.location.lat, lng: selectedMarker.location.lng }}
          onCloseClick={handleInfoWindowClose}
          pixelOffset={new google.maps.Size(0, -30)}
        >
          <div className="p-1 max-w-xs text-left">
            <Image
              src={selectedMarker.imageUrl}
              alt={selectedMarker.name}
              width={150}
              height={100}
              className="w-full h-24 object-cover rounded-t-md mb-2"
            />
            <h4 className="text-sm font-semibold mb-1">{selectedMarker.name}</h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span>{selectedMarker.rating.toFixed(1)}</span>
              <span className="ml-1">({selectedMarker.type})</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{selectedMarker.location.addressSnippet}</p>
            <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary">
              <Link href={`/listings/${selectedMarker.id}`}>View Details</Link>
            </Button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default function SearchResultsMap({ listings }: SearchResultsMapProps) {
  const isApiLoaded = useApiIsLoaded();
  const apiKeyAvailable = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKeyAvailable) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
        Map requires API Key configuration.
      </div>
    );
  }

  if (!isApiLoaded) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full">
      <MapComponent listings={listings} />
    </div>
  );
}
