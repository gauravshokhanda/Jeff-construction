import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { GoogleMap, LoadScript, Marker, DrawingManager } from '@react-google-maps/api';
import Searchbar from "../layouts/dashboard/header/Searchbar";

const mapContainerStyle = {
  height: "500px",
  width: "100%",
};

const center = {
  lat: 29.4074203, // Default center coordinates
  lng: 78.4821406,
};

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(10);
  const [drawingPosition, setDrawingPosition] = useState(null);

  const handleLocationSearch = (coordinates) => {
    setMapCenter({ lat: coordinates[0], lng: coordinates[1] }); // Update map center with coordinates
    setZoom(13);
  };

  const onMapLoad = () => {
    console.log("first Console",window.google.maps); 
    // console.log("second Console", window.google.maps.ControlPosition); // Should include TOP_CENTER

    // Check if ControlPosition is defined
    if (window.google.maps && window.google.maps.ControlPosition) {
      setDrawingPosition(window.google.maps.ControlPosition.TOP_CENTER); // Set the drawing position safely
    }
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Container maxWidth="xl" style={{ position: 'relative' }}>
          <Searchbar onLocationSearch={handleLocationSearch} />

          <LoadScript googleMapsApiKey="AIzaSyDC1rdf12jCvTnZg1IeHBHWD1DRJhAhk8w" libraries={['drawing']}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={zoom}
              onLoad={onMapLoad} // Add onLoad prop
            >
              <Marker position={mapCenter} />

              {drawingPosition && ( // Render DrawingManager only if drawingPosition is set
                <DrawingManager
                  options={{
                    drawingControl: true,
                    drawingControlOptions: {
                      position: drawingPosition, // Use the safely set position
                      drawingModes: ['polygon', 'rectangle', 'circle'],
                    },
                  }}
                  onOverlayComplete={(e) => {
                    // console.log('Drawing complete:', e);
                    if (e.type === 'polygon') {
                      // Handle polygon coordinates
                      const path = e.overlay.getPath().getArray();
                      // console.log('Polygon coordinates:', path);
                    }
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </Container>
      </Container>
    </>
  );
}
