import React, { useState } from 'react';
import { TextField, Button, Typography, Card, Box } from '@mui/material';

function LoadCalculationForm() {
  const [deadLoad, setDeadLoad] = useState('');
  const [liveLoad, setLiveLoad] = useState('');
  const [totalLoad, setTotalLoad] = useState(null);

  const handleCalculate = () => {
    // Validate inputs
    if (!deadLoad || !liveLoad) {
      alert('Please enter both dead load and live load.');
      return;
    }
    const totalLoad = parseFloat(deadLoad) + parseFloat(liveLoad);
    setTotalLoad(totalLoad);
  };

  return (
    <Card elevation={3} sx={{ padding: 3, margin: '20px auto', maxWidth: 500 }}>
      <Typography variant="h6" align="center">
        Load Calculation
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Dead Load (lbs)"
          variant="outlined"
          fullWidth
          value={deadLoad}
          onChange={(e) => setDeadLoad(e.target.value)}
          margin="normal"
          type="number"
        />
        <TextField
          label="Live Load (lbs)"
          variant="outlined"
          fullWidth
          value={liveLoad}
          onChange={(e) => setLiveLoad(e.target.value)}
          margin="normal"
          type="number"
        />
        <Button
          variant="contained"
          onClick={handleCalculate}
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Calculate Total Load
        </Button>
      </Box>
      {totalLoad !== null && (
        <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
          Total Load: {totalLoad} lbs
        </Typography>
      )}
    </Card>
  );
}

export default LoadCalculationForm;
