import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, IconButton } from '@mui/material';
import { GoogleMap, LoadScript, Marker, DrawingManager } from '@react-google-maps/api';
import Searchbar from '../layouts/dashboard/header/Searchbar';
import AreaCard from '../components/DashboardUtils/AreaCard';
import CoordinatesForm from '../components/DashboardUtils/CoordinatesForm';

const mapContainerStyle = { 
  height: '500px',
  width: '100%',
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
    const { lat: lat2 } = coordinates[nextIndex];

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);

    return acc + (((lng1 * Math.PI) / 180) * (Math.sin(φ2) - Math.sin(φ1)) * earthRadius * earthRadius) / 2;
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

const calculateCircleArea = (radius) => Math.PI * radius ** 2;
const libraries = ['drawing'];
export default function DashboardAppPage() {
  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(10);
  const [drawingPosition, setDrawingPosition] = useState(null);
  const [currentShape, setCurrentShape] = useState(null);
  const [area, setArea] = useState(null);
  const [isAreaCardVisible, setIsAreaCardVisible] = useState(false);
  const [showCoordinatesForm, setShowCoordinatesForm] = useState(false);

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

  const handleMyLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords)
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
        setZoom(15);
      },
        (error) => {
          console.error("Error getting location:", error);
        }
      )
    }

  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Search Location
        </Typography>

        <Container maxWidth="xl" style={{ position: 'relative' }}>
          <Searchbar onLocationSearch={handleLocationSearch} />

          <IconButton onClick={handleMyLocationClick}>
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 395.71 395.71"
              stroke="#000000"
              strokeWidth="0.0039571"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 
          c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 
          C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 
          c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
                </g>
              </g>
            </svg>
          </IconButton>

         

          {showCoordinatesForm && <CoordinatesForm setShowCoordinatesForm={setShowCoordinatesForm}/>}

          <LoadScript googleMapsApiKey="AIzaSyDC1rdf12jCvTnZg1IeHBHWD1DRJhAhk8w" libraries={libraries}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={zoom}
              mapTypeId="satellite"
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
                      const coordinates = path.map((latLng) => ({
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
                      setIsAreaCardVisible(true); 
                    }
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
          {isAreaCardVisible && area && <AreaCard area={area} onClose={handleAreaCardClose} />}
        </Container>
      </Container>
    </>
  );
}
