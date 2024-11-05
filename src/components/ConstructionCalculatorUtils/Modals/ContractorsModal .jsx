// ContractorsModal.js
import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Card, Typography, Button } from '@mui/material';

function ContractorsModal({ open, onClose, contractors }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Contractors with Costs</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {contractors.map((contractor) => (
                        <Grid item xs={12} sm={6} key={contractor.contractorId}>
                            <Card elevation={3} sx={{ padding: 2 }}>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Company Name:</strong> {contractor.contractor.companyName}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Email:</strong> {contractor.contractor.email}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Total Cost:</strong> ${contractor.totalCost}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

ContractorsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    contractors: PropTypes.arrayOf(
        PropTypes.shape({
            contractorId: PropTypes.string.isRequired,
            contractor: PropTypes.shape({
                companyName: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
            }).isRequired,
            totalCost: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ContractorsModal;
