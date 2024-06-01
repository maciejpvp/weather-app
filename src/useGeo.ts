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
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLocation({ lat: 20, lng: 50 });
      return;
    }

    const successHandler = async (position: GeolocationPosition) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setLocation({ lat, lng });
      setIsLoading(false);
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setError(error.message);
      setLocation({ lat: 20, lng: 50 });
      setIsLoading(false);
    };

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  return { location, isLoading, error };
};

export default useGeo;
