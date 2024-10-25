import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import CustomTextField from '../../layouts/dashboard/CustomComponent/CustomTextField ';

const AddCalculationModal = ({ openModal, closeModal, onSave }) => {
    const [formData, setFormData] = useState({
        width: '',
        name: '',
        length: '',
        area: '',
        labourCharge: '',
        clubhousePercentage: '',
        gardenPercentage: '',
        swimmingPoolPercentage: '',
        carParkingPercentage: '',
        gymPercentage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Call the onSave function passed from the parent component
        closeModal(); // Close the modal after saving
        setFormData({ // Reset form data
            width: '',
            length: '',
            area: '',
            labourCharge: '',
            clubhousePercentage: '',
            gardenPercentage: '',
            swimmingPoolPercentage: '',
            carParkingPercentage: '',
            gymPercentage: ''
        });
    };

    return (
        <Box>
            <Dialog open={openModal} onClose={closeModal}>
                <DialogTitle>Add Calculation Details</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <CustomTextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <CustomTextField
                            label="Width"
                            name="width"
                            value={formData.width}
                            onChange={handleChange}
                            required
                        />
                        <CustomTextField
                            label="Length"
                            name="length"
                            value={formData.length}
                            onChange={handleChange}
                            required
                        />
                        <CustomTextField
                            label="Area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                        />
                        <CustomTextField
                            label="Labour Charge"
                            name="labourCharge"
                            value={formData.labourCharge}
                            onChange={handleChange}
                            required
                        />
                        <CustomTextField
                            label="Clubhouse Percentage"
                            name="clubhousePercentage"
                            value={formData.clubhousePercentage}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            label="Garden Percentage"
                            name="gardenPercentage"
                            value={formData.gardenPercentage}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            label="Swimming Pool Percentage"
                            name="swimmingPoolPercentage"
                            value={formData.swimmingPoolPercentage}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            label="Car Parking Percentage"
                            name="carParkingPercentage"
                            value={formData.carParkingPercentage}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            label="Gym Percentage"
                            name="gymPercentage"
                            value={formData.gymPercentage}
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
AddCalculationModal.propTypes = {
    openModal: PropTypes.bool.isRequired, 
    closeModal: PropTypes.func.isRequired, 
    onSave: PropTypes.func.isRequired,     
};

export default AddCalculationModal;
