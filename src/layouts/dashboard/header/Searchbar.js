import { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Input, Button, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify';

const StyledSearchbar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

// eslint-disable-next-line react/prop-types
export default function Searchbar({ onLocationSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=AIzaSyDC1rdf12jCvTnZg1IeHBHWD1DRJhAhk8w`
      );
      console.log('response', response.data);
      console.log('response', response.error_message);

      if (response.data.status === 'OK') {
        const { lat, lng } = response.data.results[0].geometry.location;
        onLocationSearch([lat, lng]);
        setSearchQuery('');
      } else {
        setError('Location not found.'); // Set error message if location not found
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setError('Error fetching location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledSearchbar>
      <Input
        fullWidth
        disableUnderline
        placeholder="Search location..."
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
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
    </StyledSearchbar>
  );
}
