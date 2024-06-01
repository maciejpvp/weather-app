import { useState, useEffect } from "react";

type Coords = {
  lat: number;
  lng: number;
};

const useGeo = () => {
  const [location, setLocation] = useState<Coords | undefined>();
  const [error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const DEFAULT_VAULE = { lat: 51.507351, lng: -0.127758 };
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLocation(DEFAULT_VAULE);
      return;
    }

    const successHandler = async (position: GeolocationPosition) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setLocation({ lat, lng });
      console.log(lat, lng);
      setIsLoading(false);
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setError(error.message);
      setLocation(DEFAULT_VAULE);
      setIsLoading(false);
    };

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  return { location, isLoading, error };
};

export default useGeo;
