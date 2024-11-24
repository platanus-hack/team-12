import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: { lat: number; lng: number; label?: string }[];
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map: React.FC<MapProps> = ({ center, zoom = 10, markers = [] }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [error, setError] = useState<boolean>(false);

  if (!apiKey) {
    console.error("Google Maps API Key is missing");
    return <div>Error: Google Maps API Key is missing.</div>;
  }

  const handleScriptLoadError = () => {
    setError(true);
  };

  if (error) {
    return <div>Error al cargar Google Maps.</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} onError={handleScriptLoadError}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={marker.label}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
