import { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Input, Button, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from '../../../components/iconify';

const StyledSearchbar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

export default function Searchbar({ onLocationSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to check if the search query is coordinates
  const isCoordinates = (query) => {
    const regex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
    return regex.test(query.trim());
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError('');

    if (isCoordinates(searchQuery)) {
      // If the input is coordinates, split them and pass to the map
      const [lat, lng] = searchQuery.split(',').map(Number);
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        onLocationSearch([lat, lng]);
        setSearchQuery('');
      } else {
        setError('Invalid coordinates format.');
      }
    } else {
      // Handle the location name search (existing functionality)
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            searchQuery
          )}&key=AIzaSyDC1rdf12jCvTnZg1IeHBHWD1DRJhAhk8w`
        );

        if (response.data.status === 'OK') {
          const { lat, lng } = response.data.results[0].geometry.location;
          onLocationSearch([lat, lng]);
          setSearchQuery('');
        } else {
          setError('Location not found.');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setError('Error fetching location. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <StyledSearchbar>
      <Input
        fullWidth
        disableUnderline
        placeholder="Search location or enter coordinates (e.g., latitude, longitude)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />
      <Button variant="contained" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </StyledSearchbar>
  );
}

Searchbar.propTypes = {
  onLocationSearch: PropTypes.func.isRequired,
};
