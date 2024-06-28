import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import * as S from "./styles";

const GoogleMapComponent = ({ selectedLocation }) => {
  const center = selectedLocation || { lat: -3.745, lng: -38.523 };

  return (
    <S.MapContainer>
      <LoadScript googleMapsApiKey="AIzaSyD7HkFL2rkQ11MeNtyrRJZG2zpX-ddBjJs">
        <GoogleMap mapContainerStyle={S.mapStyles} center={center} zoom={10}>
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </LoadScript>
    </S.MapContainer>
  );
};

export default GoogleMapComponent;
