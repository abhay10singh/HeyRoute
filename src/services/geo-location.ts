

export interface Location {

  lat: number;

  lng: number;
}


export function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error("User denied the request for Geolocation."));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("Location information is unavailable."));
              break;
            case error.TIMEOUT:
              reject(new Error("The request to get user location timed out."));
              break;
            default:
               reject(new Error("An unknown error occurred while retrieving location."));
               break; 
          }
        },
         {
             enableHighAccuracy: false, 
             timeout: 10000,
             maximumAge: 60000 
         }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}
