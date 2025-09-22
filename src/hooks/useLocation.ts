import { useState, useEffect, useCallback } from 'react';

export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface NavigationRoute {
  destination: string;
  distance: string;
  duration: string;
  steps: string[];
  type: 'walking' | 'driving' | 'transit';
}

export interface NearbyFacility {
  name: string;
  type: 'parking' | 'restaurant' | 'medical' | 'accommodation' | 'atm';
  distance: string;
  walkingTime: string;
  location: Location;
  available?: boolean;
  rating?: number;
}

export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Temple locations (predefined famous temples)
  const templeLocations = {
    somnath: { latitude: 20.8880, longitude: 70.4017, name: 'Somnath Temple' },
    dwarka: { latitude: 22.2394, longitude: 68.9678, name: 'Dwarkadhish Temple' },
    ambaji: { latitude: 24.0208, longitude: 72.8678, name: 'Ambaji Temple' },
    pavagadh: { latitude: 22.4854, longitude: 73.5314, name: 'Pavagadh Temple' }
  };

  const getCurrentLocation = useCallback(() => {
    setIsLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, []);

  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  const getNavigationRoute = useCallback((destination: keyof typeof templeLocations, transportType: 'walking' | 'driving' | 'transit' = 'driving'): NavigationRoute => {
    const temple = templeLocations[destination];
    
    // Simulated route data (in real app, would use Google Maps API or similar)
    const routes: Record<string, NavigationRoute> = {
      walking: {
        destination: temple.name,
        distance: '2.3 km',
        duration: '28 minutes',
        steps: [
          'Head northeast on Main Road',
          'Turn right onto Temple Street',
          'Continue straight for 1.5 km',
          'Turn left at the temple complex entrance',
          'Destination will be on your right'
        ],
        type: 'walking'
      },
      driving: {
        destination: temple.name,
        distance: '12.7 km',
        duration: '18 minutes',
        steps: [
          'Head north on Highway 101',
          'Take exit 23 toward Temple Road',
          'Turn right onto Temple Road',
          'Follow signs to main parking area',
          'Park in designated visitor parking'
        ],
        type: 'driving'
      },
      transit: {
        destination: temple.name,
        distance: '15.2 km',
        duration: '45 minutes',
        steps: [
          'Walk to Central Bus Stand (5 min)',
          'Take Bus Route 42 toward Temple District',
          'Get off at Temple Gate stop (35 min)',
          'Walk to temple entrance (5 min)'
        ],
        type: 'transit'
      }
    };

    return routes[transportType];
  }, []);

  const getNearbyFacilities = useCallback((facilityType?: NearbyFacility['type']): NearbyFacility[] => {
    const allFacilities: NearbyFacility[] = [
      {
        name: 'Temple Parking Lot A',
        type: 'parking',
        distance: '200m',
        walkingTime: '2 min',
        location: { latitude: 20.8885, longitude: 70.4020, accuracy: 5 },
        available: true,
        rating: 4.2
      },
      {
        name: 'Temple Parking Lot B',
        type: 'parking',
        distance: '450m',
        walkingTime: '5 min',
        location: { latitude: 20.8875, longitude: 70.4025, accuracy: 5 },
        available: false,
        rating: 4.0
      },
      {
        name: 'Prasadam Restaurant',
        type: 'restaurant',
        distance: '300m',
        walkingTime: '3 min',
        location: { latitude: 20.8890, longitude: 70.4015, accuracy: 5 },
        rating: 4.5
      },
      {
        name: 'Temple Medical Center',
        type: 'medical',
        distance: '150m',
        walkingTime: '2 min',
        location: { latitude: 20.8883, longitude: 70.4019, accuracy: 5 },
        rating: 4.8
      },
      {
        name: 'Pilgrim Rest House',
        type: 'accommodation',
        distance: '800m',
        walkingTime: '10 min',
        location: { latitude: 20.8870, longitude: 70.4010, accuracy: 5 },
        available: true,
        rating: 4.1
      },
      {
        name: 'State Bank ATM',
        type: 'atm',
        distance: '250m',
        walkingTime: '3 min',
        location: { latitude: 20.8888, longitude: 70.4022, accuracy: 5 },
        available: true
      }
    ];

    return facilityType 
      ? allFacilities.filter(facility => facility.type === facilityType)
      : allFacilities;
  }, []);

  const openInMaps = useCallback((destination: keyof typeof templeLocations | Location) => {
    let lat: number, lng: number;
    
    if (typeof destination === 'string') {
      const temple = templeLocations[destination];
      lat = temple.latitude;
      lng = temple.longitude;
    } else {
      lat = destination.latitude;
      lng = destination.longitude;
    }

    // Try to open in native maps app, fallback to Google Maps web
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    const nativeUrl = `maps://app?daddr=${lat},${lng}`;
    
    // Try native app first
    const link = document.createElement('a');
    link.href = nativeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Fallback to web after a short delay
    setTimeout(() => {
      window.open(mapsUrl, '_blank');
    }, 1000);
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return {
    currentLocation,
    locationError,
    isLoading,
    templeLocations,
    getCurrentLocation,
    calculateDistance,
    getNavigationRoute,
    getNearbyFacilities,
    openInMaps
  };
};