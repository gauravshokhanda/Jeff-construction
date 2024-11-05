import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import MaterialEstimateForm from '../components/ConstructionCalculatorUtils/MaterialEstimateForm';
import CostEstimateForm from '../components/ConstructionCalculatorUtils/CostEstimateForm ';
import AreaVolumeForm from '../components/ConstructionCalculatorUtils/AreaVolumeForm ';
import LoadCalculationForm from '../components/ConstructionCalculatorUtils/LoadCalculationForm';
import CustomCalculationForm from '../components/ConstructionCalculatorUtils/CustomCalculationForm';

function ConstructionCalculator() {
    const [selectedCalc, setSelectedCalc] = useState(null);

    const renderSelectedForm = () => {
        switch (selectedCalc) {
            case 'material':
                return <MaterialEstimateForm />;
            case 'cost':
                return <CostEstimateForm />;
            case 'areaVolume':
                return <AreaVolumeForm />;
            case 'load':
                return <LoadCalculationForm />;
            case 'custom':
                return <CustomCalculationForm />;
            default:
                return <MaterialEstimateForm />;
        }
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Construction Calculator
            </Typography>

            <Box display="flex" justifyContent="center" marginBottom={2}>
                <Button variant="contained" onClick={() => setSelectedCalc('material')} sx={{ margin: 1 }}>
                    Material Estimate
                </Button>
                <Button variant="contained" onClick={() => setSelectedCalc('cost')} sx={{ margin: 1 }}>
                    Cost Estimate
                </Button>
                <Button variant="contained" onClick={() => setSelectedCalc('areaVolume')} sx={{ margin: 1 }}>
                    Area & Volume
                </Button>
                <Button variant="contained" onClick={() => setSelectedCalc('load')} sx={{ margin: 1 }}>
                    Load Calculation
                </Button>
                <Button variant="contained" onClick={() => setSelectedCalc('custom')} sx={{ margin: 1 }}>
                    Custom Calculation
                </Button>
            </Box>

            {renderSelectedForm()}
        </Container>
    );
}

export default ConstructionCalculator;
