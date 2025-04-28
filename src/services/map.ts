import type { Location } from './geo-location'; // Import Location type

/**
 * Represents a map marker with location and details.
 */
export interface MapMarker {
  /**
   * The latitude of the marker.
   */
  lat: number;
  /**
   * The longitude of the marker.
   */
  lng: number;
  /**
   * The title or name of the location.
   */
  title: string;
  /**
   * A brief description of the location.
   */
  description: string;
   /**
   * The type of place (optional).
   */
  type?: 'Hotel' | 'Restaurant' | 'Attraction' | 'Other';
}

/**
 * Asynchronously retrieves map markers near a given location.
 * In a real app, this would filter based on location and radius.
 *
 * @param location The center location of the map.
 * @param radius The radius around the location to search for markers in kilometers.
 * @returns A promise that resolves to an array of MapMarker objects.
 */
export async function getMapMarkers(location: Location, radius: number): Promise<MapMarker[]> {
  // TODO: Implement actual API call filtering by location and radius.
  // For now, return dummy data slightly adjusted based on input location.

  console.log(`[getMapMarkers] Fetching markers near ${location.lat}, ${location.lng} within ${radius}km`);

  // Simulate some variation based on location - very basic
  const baseLat = location.lat;
  const baseLng = location.lng;
  const offset = 0.01 * (radius / 5); // Small offset based on radius

  const dummyMarkers: MapMarker[] = [
     {
      id: '1',
      lat: baseLat + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      lng: baseLng + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      title: 'The Grand Plaza Hotel',
      description: 'Experience unparalleled luxury and service.',
       type: 'Hotel',
    },
    {
      id: '2',
      lat: baseLat + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      lng: baseLng + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      title: 'Bella Italia Ristorante',
      description: 'Authentic Italian cuisine in a charming atmosphere.',
      type: 'Restaurant',
    },
     {
      id: '3',
      lat: baseLat + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      lng: baseLng + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      title: 'City History Museum',
      description: 'Explore the rich history of the area.',
      type: 'Attraction',
    },
      {
      id: '4',
      lat: baseLat + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      lng: baseLng + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      title: 'Mountain View Cafe',
      description: 'Cozy cafe with great coffee and snacks.',
       type: 'Restaurant',
    },
     {
      id: '5',
      lat: baseLat + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      lng: baseLng + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      title: 'Riverside Park',
      description: 'A lovely park for walks and picnics.',
       type: 'Attraction',
    },
     {
      id: '6',
      lat: baseLat + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      lng: baseLng + offset * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      title: 'Coastal Breeze Inn',
      description: 'Relaxing beachfront accommodation.',
       type: 'Hotel',
    },
  ];

   // Simple distance calculation (Haversine formula approx) for filtering
   // In a real API, the backend would handle this efficiently.
   const filterByDistance = (marker: MapMarker, center: Location, maxDistanceKm: number): boolean => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (marker.lat - center.lat) * Math.PI / 180;
        const dLon = (marker.lng - center.lng) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(center.lat * Math.PI / 180) * Math.cos(marker.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance <= maxDistanceKm;
   };


   // Simulate filtering - return only first few markers for demo
   // return dummyMarkers.filter(marker => filterByDistance(marker, location, radius));
   return dummyMarkers.slice(0, Math.floor(Math.random() * dummyMarkers.length) + 1); // Return random subset for variety
}
