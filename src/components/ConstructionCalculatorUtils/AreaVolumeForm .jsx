import React, { useState } from 'react';
import { TextField, Button, Typography, Card, Box, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function AreaVolumeForm() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [area, setArea] = useState(null);
  const [volume, setVolume] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalculate = () => {
    if (!length || !width || !height) {
      setErrorMessage('Please enter all dimensions.');
      setOpen(true);
      return;
    }

    const areaValue = parseFloat(length) * parseFloat(width);
    const volumeValue = areaValue * parseFloat(height);
    setArea(areaValue);
    setVolume(volumeValue);
    setOpen(true); // Show success message
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  return (
    <Card elevation={3} sx={{ padding: 3, margin: '20px auto', maxWidth: 500 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Area & Volume Calculation
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Length"
              variant="outlined"
              fullWidth
              value={length}
              onChange={(e) => setLength(e.target.value)}
              margin="normal"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Width"
              variant="outlined"
              fullWidth
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              margin="normal"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Height"
              variant="outlined"
              fullWidth
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              margin="normal"
              type="number"
            />
          </Grid>
        </Grid>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCalculate} 
          sx={{ marginTop: 2 }} 
          fullWidth
        >
          Calculate Area & Volume
        </Button>
      </Box>
      {area !== null && volume !== null && (
        <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
          Area: {area} square units <br />
          Volume: {volume} cubic units
        </Typography>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={errorMessage ? "error" : "success"}>
          {errorMessage || 'Area and volume calculated successfully!'}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default AreaVolumeForm;
