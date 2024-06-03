import { useState, useEffect } from 'react';

interface Location {
  data: any;
}
const API_KEY=''
const useUserLocation = (): Location | null => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {'Content-Type': 'application/json', Authorization: 'Bearer undefined'}
        };
        // Fetch additional details like time zone and country code using Google Maps Geocoding API
        const response = await fetch(`https://api.cloudflare.com/client/v4/zones/cce82946786a744a5d0d219f8cf69d46/settings/ip_geolocation`,options);
        const data = await response.json();
        // Extract time zone and country code from the response
        const timeZone = data.results[0]?.time_zone;
        const countryCode = data.results[0]?.address_components.find((component: any) =>
          component.types.includes('country')
        )?.short_name;

        setUserLocation({ data});
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    getUserLocation();

  }, []);

  return userLocation;
};

export default useUserLocation;
