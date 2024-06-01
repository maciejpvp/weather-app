import { WeatherCard } from "./WeatherCard";
import useGeo from "./useGeo";
import { useWeather } from "./useWeather";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #121212;
    color: #e0e0e0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const App = () => {
  const { location: { lat, lng } = {}, isLoading: isLoadingGeo } = useGeo();
  const { isLoading: isLoadingWeather, weather } = useWeather({
    lat,
    lng,
  });
  if (isLoadingWeather || isLoadingGeo || !weather) return <p>Loading...</p>;
  return (
    <Container>
      <GlobalStyle />
      <WeatherCard {...weather} />
    </Container>
  );
};

export default App;
