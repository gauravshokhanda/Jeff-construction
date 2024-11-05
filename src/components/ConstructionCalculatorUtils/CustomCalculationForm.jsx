import React, { useState } from 'react';
import { TextField, Button, Typography, Card, Box } from '@mui/material';
import { create, all } from 'mathjs';

const math = create(all, {});

function CustomCalculationForm() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      const evaluatedResult = math.evaluate(expression);
      setResult(evaluatedResult);
    } catch (error) {
      setResult('Error: Invalid Expression');
    }
  };

  return (
    <Card elevation={3} sx={{ padding: 3, margin: '20px auto', maxWidth: 500 }}>
      <Typography variant="h6" align="center">
        Custom Calculation
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Enter Expression"
          variant="outlined"
          fullWidth
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="e.g., 2 * 3 + 5"
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleCalculate}
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Calculate
        </Button>
      </Box>
      {result !== null && (
        <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
          Result: {result}
        </Typography>
      )}
    </Card>
  );
}

export default CustomCalculationForm;
