/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, Typography, Button, Container } from '@mui/material';

// eslint-disable-next-line react/prop-types
const AreaCard = ({ area, onClose }) => (
        <Container sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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

export default AreaCard;
