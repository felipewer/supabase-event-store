import { useEffect } from 'react';
import create from 'zustand';
import useGeolocationSource from "react-hook-geolocation";


type Geolocation = {
  latitude: number;
  longitude: number;
}

type GeolocationStore = {
  geolocation?: Geolocation,
  updateGeolocation: (geolocation: Geolocation) => void
}

export const useGeolocationStore = create<GeolocationStore>((set) => ({
  geolocation: undefined,
  updateGeolocation: (coordinates: Geolocation) => set(() => ({ geolocation: coordinates })),
}))


export const useGeolocation = () => {
  const { geolocation, updateGeolocation } = useGeolocationStore()

  const geolocationSource = useGeolocationSource({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000,
  });

  useEffect(() => {
    updateGeolocation(geolocationSource)
  }, [geolocationSource])

  return geolocation
}
