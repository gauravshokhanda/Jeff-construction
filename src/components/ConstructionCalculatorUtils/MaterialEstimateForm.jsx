import React, { useState } from 'react';
import { TextField, Button, Typography, Card, Box, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setContractors } from "../../redux/Slices/contractorReducer"
import ContractorCard from "./Card/ContractorCard"; // Make sure the path is correct

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function MaterialEstimateForm() {
  const [length, setLength] = useState('');
  const [area, setArea] = useState('');
  const [contractorsWithCost, setContractorsWithCost] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const fetchContractorsWithCost = async () => {
    try {
      const query = new URLSearchParams({ area, length }).toString();
      const response = await fetch(`http://localhost:5000/api/costs/contractor-costs?${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contractor costs');
      }

      const data = await response.json();
      dispatch(setContractors(data));
      setContractorsWithCost(data);
      setMessage('Contractor costs fetched successfully!');

      navigate('/dashboard/contractorCard');

    } catch (error) {
      setMessage(error.message);
      setOpenSnackbar(true); // Show error message
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card elevation={3} sx={{ padding: 3, margin: '20px auto', maxWidth: 500 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Material Estimate - Concrete Volume
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Length (ft)"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Area (sq ft)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              type="number"
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchContractorsWithCost}
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Calculate Cost
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={message.includes('Failed') ? "error" : "success"}>
          {message}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default MaterialEstimateForm;
