// src/ContractorCard.js
import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get data from Redux
import { Card, CardContent, Typography, Grid, Box } from '@mui/material'; // Import Material-UI components

const ContractorCard = () => {
    const contractors = useSelector((state) => state.contractor.contractors); // Get contractors from Redux store
    console.log("contractors", contractors); // Log contractors to the console

    return (
        <div>
            <Typography variant="h4" gutterBottom align="center">
                Contractor Details
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {contractors.length > 0 ? (
                    contractors.map((contractorData) => {
                        const { contractor, totalCost } = contractorData; // Destructure contractor data
                        return (
                            <Grid item xs={12} sm={6} md={4} key={contractor.contractorId}>
                                <Card elevation={3} sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            {contractor.companyName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Email:</strong> {contractor.email}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Phone:</strong> {contractor.phoneNumber}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            <strong>Profile:</strong> {contractor.profile}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Total Cost:</strong> ₹{totalCost.toLocaleString()}
                                        </Typography>
                                        <Box mt={2}>
                                            <Typography variant="h6">Rates</Typography>
                                            <ul>
                                                {Object.entries(contractor.rates).map(([key, value]) => (
                                                    <li key={key}>
                                                        <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> ₹{value.toLocaleString()}
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                ) : (
                    <Typography variant="body1" color="text.secondary">
                        No contractor details available.
                    </Typography>
                )}
            </Grid>
        </div>
    );
};

export default ContractorCard;
