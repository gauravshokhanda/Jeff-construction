import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Container } from '@mui/material';

const AreaCard = ({ area, onClose }) => {
    return (
        <Container sx={{
            position: 'absolute',
            top: '30%',
            right: '0', 
            transform: 'translateY(-50%)', 
            zIndex: 1000,
            width: '300px',
        }}>
            <Card variant="outlined" style={{ width: '300px' }}>
                <CardContent>
                    <Typography variant="h6" style={{ marginTop: '20px' }}>
                        Area
                    </Typography>
                    <Typography variant="body1">{area.toFixed(2)} m²</Typography>
                </CardContent>
                <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={onClose}>
                    Close
                </Button>
            </Card>
        </Container>
    );
};

export default AreaCard;
