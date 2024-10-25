import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
    Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormHelperText
} from '@mui/material';
import CustomTextField from "../../layouts/dashboard/CustomComponent/CustomTextField ";
// eslint-disable-next-line react/prop-types
const EditCalculationModal = ({ openModal, closeModal,closeEditModal, editData ,openEditModal,onSave }) => {
    const [formData, setFormData] = useState({
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

    const [errors, setErrors] = useState({}); // State to hold error messages

    useEffect(() => {
        if (editData) {
            setFormData(editData); // Set form data when editData is loaded
        }
    }, [editData]);

    const validate = () => {
        const newErrors = {};
        const requiredFields = ['width', 'length', 'area', 'labourCharge'];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `${field} is required`;
            } else if (Number.isNaN(Number(formData[field])) || !Number.isFinite(Number(formData[field]))) {
                newErrors[field] = `${field} must be a valid number`;
            }
        });

        setErrors(newErrors); // Update the errors state
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({ ...errors, [name]: '' }); // Clear error for the field being edited
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.put(`http://3.111.47.151:5000/api/calculations/${editData._id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                closeEditModal(); // Close the modal after successful update
            } catch (error) {
                console.error('Error updating the calculation:', error);
            }
        }
    };

    return (
        <Box>
            <Dialog open={openEditModal} onClose={closeEditModal}>
                <DialogTitle>Edit Calculation Details</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <CustomTextField
                            label="Width"
                            name="width"
                            value={formData.width}
                            onChange={handleChange}
                            required
                            error={!!errors.width} // Set error state
                        />
                        {errors.width && <FormHelperText error>{errors.width}</FormHelperText>}

                        <CustomTextField
                            label="Length"
                            name="length"
                            value={formData.length}
                            onChange={handleChange}
                            required
                            error={!!errors.length} // Set error state
                        />
                        {errors.length && <FormHelperText error>{errors.length}</FormHelperText>}

                        <CustomTextField
                            label="Area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                            error={!!errors.area} // Set error state
                        />
                        {errors.area && <FormHelperText error>{errors.area}</FormHelperText>}

                        <CustomTextField
                            label="Labour Charge"
                            name="labourCharge"
                            value={formData.labourCharge}
                            onChange={handleChange}
                            required
                            error={!!errors.labourCharge} // Set error state
                        />
                        {errors.labourCharge && <FormHelperText error>{errors.labourCharge}</FormHelperText>}

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
                    <Button onClick={closeEditModal} color="secondary">Cancel</Button>
                    <Button type="submit" onClick={handleSubmit} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

EditCalculationModal.propTypes = {
    openEditModal: PropTypes.bool.isRequired,
    closeEditModal: PropTypes.func.isRequired,
    editData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        width: PropTypes.string,
        length: PropTypes.string,
        area: PropTypes.string,
        labourCharge: PropTypes.string,
        clubhousePercentage: PropTypes.string,
        gardenPercentage: PropTypes.string,
        swimmingPoolPercentage: PropTypes.string,
        carParkingPercentage: PropTypes.string,
        gymPercentage: PropTypes.string
    })
};

export default EditCalculationModal;
