import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  timeZone: string | null;
  countryCode: string | null;
}
const API_KEY=''
const useUserLocation = (): Location | null => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        // Call the browser's Geolocation API to get the user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // Extract latitude and longitude from the position object
        const { latitude, longitude } = position.coords;

        // Fetch additional details like time zone and country code using Google Maps Geocoding API
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`);
        const data = await response.json();

        // Extract time zone and country code from the response
        const timeZone = data.results[0]?.time_zone;
        const countryCode = data.results[0]?.address_components.find((component: any) =>
          component.types.includes('country')
        )?.short_name;

        setUserLocation({ latitude, longitude, timeZone, countryCode });
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    getUserLocation();

  }, []);

  return userLocation;
};

export default useUserLocation;
