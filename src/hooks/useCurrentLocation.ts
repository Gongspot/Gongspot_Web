// src/hooks/useCurrentLocation.ts
import { useState, useEffect } from 'react';

interface LocationState {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: GeolocationPositionError;
}

export const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState<LocationState>({ loaded: false });

  useEffect(() => {
    const onSuccess = (position: GeolocationPosition) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setLocation({ loaded: true, error });
    };

    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      } as GeolocationPositionError);
      return;
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []); // 빈 배열로 두어 컴포넌트 마운트 시 한 번만 실행

  return location;
};