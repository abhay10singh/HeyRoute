import type { Location } from './geo-location'; 

export interface MapMarker {

  lat: number;

  lng: number;
 
  title: string;
 
  description: string;
 
  type?: 'Hotel' | 'Restaurant' | 'Attraction' | 'Other';
}


export async function getMapMarkers(location: Location, radius: number): Promise<MapMarker[]> {


  console.log(`[getMapMarkers] Fetching markers near ${location.lat}, ${location.lng} within ${radius}km`);


  const baseLat = location.lat;
  const baseLng = location.lng;
  const offset = 0.01 * (radius / 5); 
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


 
   return dummyMarkers.slice(0, Math.floor(Math.random() * dummyMarkers.length) + 1);
}
