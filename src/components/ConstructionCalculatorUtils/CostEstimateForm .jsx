import React, { useState } from 'react';
import { TextField, Button, Typography, Card, Box } from '@mui/material';

function CostEstimateForm() {
  const [materialCost, setMaterialCost] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [totalCost, setTotalCost] = useState(null);

  const handleCalculate = () => {
    // Validate inputs
    if (!materialCost || !laborCost) {
      alert('Please enter both material and labor costs.');
      return;
    }
    const total = parseFloat(materialCost) + parseFloat(laborCost);
    setTotalCost(total);
  };

  return (
    <Card elevation={3} sx={{ padding: 3, margin: '20px auto', maxWidth: 500 }}>
      <Typography variant="h6" align="center">
        Cost Estimate
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Material Cost ($)"
          variant="outlined"
          fullWidth
          value={materialCost}
          onChange={(e) => setMaterialCost(e.target.value)}
          margin="normal"
          type="number"
        />
        <TextField
          label="Labor Cost ($)"
          variant="outlined"
          fullWidth
          value={laborCost}
          onChange={(e) => setLaborCost(e.target.value)}
          margin="normal"
          type="number"
        />
        <Button
          variant="contained"
          onClick={handleCalculate}
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Calculate Total Cost
        </Button>
      </Box>
      {totalCost !== null && (
        <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
          Total Cost: ${totalCost.toFixed(2)}
        </Typography>
      )}
    </Card>
  );
}

export default CostEstimateForm;
