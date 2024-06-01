import { useState } from "react";
import { WeatherData } from "./types";
import styled from "styled-components";

const StyledWeatherCard = styled.div<{ props: string }>`
  background: #1e1e1e;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  padding: 20px;
  max-width: 300px;
  width: 25rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    background: url(${(props) => props.props}) no-repeat center;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(5px);
    opacity: 0.1;
    pointer-events: none;
  }
`;

const CityName = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Temperature = styled.div`
  font-size: 48px;
  font-weight: 200;
  margin: 10px 0;
`;

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #888;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const DetailItem = styled.div`
  text-align: center;
`;

const DetailLabel = styled.div`
  font-size: 14px;
  color: #aaa;
`;

const DetailValue = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const ToggleButton = styled.button`
  background: #333;
  color: #e0e0e0;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #444;
  }
`;

export const WeatherCard = (weather: WeatherData) => {
  const [isCelsius, setIsCelcious] = useState<boolean>(true);
  const temperature = isCelsius
    ? Math.round(weather?.main?.temp || 0)
    : Math.round((weather?.main?.temp || 0) * 1.8 + 32);
  const iconUrl = `${weather?.weather?.[0].icon}`;
  return (
    <StyledWeatherCard props={iconUrl}>
      <CityName>{weather?.name}</CityName>
      <Temperature>
        {temperature}°{isCelsius ? "C" : "F"}
      </Temperature>
      <Description>{weather?.weather?.[0].description}</Description>
      <Details>
        <DetailItem>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{weather?.main?.humidity}%</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Wind</DetailLabel>
          <DetailValue>{weather?.wind?.speed} m/s</DetailValue>
        </DetailItem>
      </Details>
      <ToggleButton
        onClick={() => {
          setIsCelcious((prev) => !prev);
        }}
      >
        Switch to °{isCelsius ? "F" : "C"}
      </ToggleButton>
    </StyledWeatherCard>
  );
};
