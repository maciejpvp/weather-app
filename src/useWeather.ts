import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "./types";

type Coords = {
  lat?: number;
  lng?: number;
};

export const useWeather = ({ lat, lng }: Coords) => {
  const isReady = !!lat || !!lng;
  const {
    isLoading,
    data: weather,
    error,
  } = useQuery<WeatherData>({
    queryKey: ["weather"],
    enabled: isReady,
    queryFn: () =>
      fetch(
        `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lng}`,
      ).then((res) => res.json()),
  });
  return { isLoading, weather, error };
};
