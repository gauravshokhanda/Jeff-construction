import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { GoogleMap, LoadScript, Marker, DrawingManager } from '@react-google-maps/api';
import Searchbar from "../layouts/dashboard/header/Searchbar";
import AreaCard from '../components/AreaCard/AreaCard';

const mapContainerStyle = {
  height: "500px",
  width: "100%",
};

const center = {
  lat: 29.4074203, 
  lng: 78.4821406,
};

const calculatePolygonArea = (coordinates) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadius = 6371000; 

  const area = coordinates.reduce((acc, current, index) => {
    const nextIndex = (index + 1) % coordinates.length; // Calculate the next index in a circular manner
    const { lat: lat1, lng: lng1 } = current;
    const { lat: lat2, lng: lng2 } = coordinates[nextIndex];

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δλ = toRadians(lng2 - lng1);

    return acc + (lng1 * Math.PI / 180) * (Math.sin(φ2) - Math.sin(φ1)) * earthRadius * earthRadius / 2;
  }, 0);

  return Math.abs(area);
};

const calculateRectangleArea = (bounds) => {
  const northEast = bounds.getNorthEast();
  const southWest = bounds.getSouthWest();

  const width = Math.abs(northEast.lng() - southWest.lng()) * 111319; 
  const height = Math.abs(northEast.lat() - southWest.lat()) * 110574; 

  return width * height; 
};

const calculateCircleArea = (radius) => {
  return Math.PI * (radius ** 2); 
};
const libraries = ['drawing'];
export default function DashboardAppPage() {
  const theme = useTheme();
  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(10);
  const [drawingPosition, setDrawingPosition] = useState(null);
  const [currentShape, setCurrentShape] = useState(null);
  const [area, setArea] = useState(null);
  const [isAreaCardVisible, setIsAreaCardVisible] = useState(false);

  const handleLocationSearch = (coordinates) => {
    setMapCenter({ lat: coordinates[0], lng: coordinates[1] }); 
    setZoom(13);
  };
  const clearPreviousShape = () => {
    if (currentShape) {
      currentShape.setMap(null); 
      setCurrentShape(null);
    }
  };

  const onMapLoad = () => {
    if (window.google.maps && window.google.maps.ControlPosition) {
      setDrawingPosition(window.google.maps.ControlPosition.TOP_CENTER); // Set the drawing position safely
    }
  };
  const handleAreaCardClose = () => {
    setIsAreaCardVisible(false); 
    currentShape.setMap(null);
    setCurrentShape(null);
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

          <LoadScript googleMapsApiKey="AIzaSyDC1rdf12jCvTnZg1IeHBHWD1DRJhAhk8w" libraries={libraries}>
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
                      position: drawingPosition, 
                      drawingModes: ['polygon', 'rectangle', 'circle'],
                    },
                  }}
                  onOverlayComplete={(e) => {
                    clearPreviousShape();
                    const shape = e.overlay;
                    setCurrentShape(shape);

                    let calculatedArea;

                    if (e.type === 'polygon') {
                      const path = shape.getPath().getArray();
                      const coordinates = path.map(latLng => ({
                        lat: latLng.lat(),
                        lng: latLng.lng(),
                      }));
                      calculatedArea = calculatePolygonArea(coordinates);
                    } else if (e.type === 'rectangle') {
                      const bounds = shape.getBounds();
                      calculatedArea = calculateRectangleArea(bounds);
                    } else if (e.type === 'circle') {
                      const radius = shape.getRadius();
                      calculatedArea = calculateCircleArea(radius);
                    }

                    if (calculatedArea) {
                      setArea(calculatedArea);
                      setIsAreaCardVisible(true); // Show AreaCard with area information
                    }
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
          {isAreaCardVisible && area && <AreaCard area={area} onClose={handleAreaCardClose} 
        
          />}
        </Container>
      </Container>
    </>
  );
}
