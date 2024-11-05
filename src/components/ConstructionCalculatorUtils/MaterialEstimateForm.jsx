import React, { useState } from 'react';
import { TextField, Button, Typography, Card, Box, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ContractorsModal from './Modals/ContractorsModal '; // Import the modal component

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function MaterialEstimateForm() {
  const [length, setLength] = useState('');
  const [area, setArea] = useState('');
  const [contractorsWithCost, setContractorsWithCost] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

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
      setContractorsWithCost(data);
      setMessage('Contractor costs fetched successfully!');
      setOpenSnackbar(true); // Show success message
      setOpenModal(true); // Open modal with contractors' details
    } catch (error) {
      setMessage(error.message);
      setOpenSnackbar(true); // Show error message
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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

      {/* Contractors Modal */}
      <ContractorsModal
        open={openModal}
        onClose={handleCloseModal}
        contractors={contractorsWithCost}
      />
    </Card>
  );
}

export default MaterialEstimateForm;
