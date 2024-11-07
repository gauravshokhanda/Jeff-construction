// src/ContractorCard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, Box, Avatar, List, ListItem, ListItemText, Divider, CardActions, Button } from '@mui/material';

const ContractorCard = () => {
    const contractors = useSelector((state) => state.contractor.contractors);

    return (
        <Box px={3} py={5}>
            <Typography variant="h4" gutterBottom align="center" color="primary">
                Contractor Details
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {contractors.length > 0 ? (
                    contractors.map((contractorData) => {
                        const { contractor, totalCost } = contractorData;
                        return (
                            <Grid item xs={12} sm={6} md={4} key={contractor.contractorId}>
                                <Card
                                    elevation={5}
                                    sx={{
                                        maxWidth: 350,
                                        padding: 3,
                                        borderRadius: "15px",
                                        transition: "transform 0.3s",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                                        },
                                        backgroundColor: "#f7f9fc",
                                    }}
                                >
                                    <Box display="flex" justifyContent="center" mb={2}>
                                        <Avatar sx={{ width: 80, height: 80, bgcolor: "#1976d2" }}>
                                            {contractor.companyName.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </Box>
                                    <CardContent>
                                        <Typography variant="h5" component="div" align="center" fontWeight="bold" color="primary">
                                            {contractor.companyName}
                                        </Typography>
                                        <Box mt={2} textAlign="center">
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Email:</strong> {contractor.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Phone:</strong> {contractor.phoneNumber}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                <strong>Profile:</strong> {contractor.profile}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                                Total Cost: ₹{totalCost.toLocaleString()}
                                            </Typography>
                                        </Box>
                                        {/* <Divider sx={{ my: 2 }} />
                                        <Typography variant="h6" align="center" color="text.primary" gutterBottom>
                                            Rates
                                        </Typography>
                                        <List dense>
                                            {Object.entries(contractor.rates).map(([key, value]) => (
                                                <ListItem key={key} sx={{ py: 0 }}>
                                                    <ListItemText
                                                        primary={`${key.replace(/([A-Z])/g, ' $1')}`}
                                                        primaryTypographyProps={{ fontWeight: "bold" }}
                                                        secondary={`₹${value.toLocaleString()}`}
                                                        secondaryTypographyProps={{ color: "text.primary" }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List> */}
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: "center", mt: 2 }}>
                                        <Button variant="outlined" size="small" color="primary">Choose</Button>
                                        {/* <Button variant="contained" size="small" color="secondary">Delete</Button> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })
                ) : (
                    <Typography variant="body1" color="text.secondary" align="center">
                        No contractor details available.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default ContractorCard;
