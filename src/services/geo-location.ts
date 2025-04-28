
/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Asynchronously retrieves the user's current location using the browser's Geolocation API.
 *
 * @returns A promise that resolves to a Location object containing latitude and longitude.
 * @throws An error if geolocation is not supported or the user denies permission.
 */
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
               break; // Added break statement
          }
        },
         {
             enableHighAccuracy: false, // Lower accuracy is often faster and sufficient
             timeout: 10000, // 10 seconds timeout
             maximumAge: 60000 // Allow cached position up to 1 minute old
         }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}
