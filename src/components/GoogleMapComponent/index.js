import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import * as S from "./styles";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const GoogleMapComponent = ({ selectedLocation }) => {
  const center = selectedLocation || { lat: -3.745, lng: -38.523 };

  return (
    <S.MapContainer>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={S.mapStyles} center={center} zoom={10}>
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </LoadScript>
    </S.MapContainer>
  );
};

export default GoogleMapComponent;
