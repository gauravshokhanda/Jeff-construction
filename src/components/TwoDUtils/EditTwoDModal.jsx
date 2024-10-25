import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
    Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormHelperText, Select, MenuItem
} from '@mui/material';
import CustomTextField from "../../layouts/dashboard/CustomComponent/CustomTextField ";

const EditCalculationModal = ({ openEditModal, closeEditModal, editData }) => {
    const [formData, setFormData] = useState({
        name: '',
        calculation: '',
        image: null,
    });

    const [errors, setErrors] = useState({});
    const calculationOptions = ['Option 1', 'Option 2', 'Option 3']; // Define calculation options here

    useEffect(() => {
        if (editData) {
           console.log("calc name",editData.calculation.name);
            setFormData(prevFormData => ({
                ...prevFormData,
                name: editData.name || '', // Set name if available
                calculation: editData.calculation.name || '', // Set calculation if available
                image: null // Reset image input
            }));
        }
    }, [editData]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.calculation) {
            newErrors.calculation = 'Calculation is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({ ...errors, [name]: '' });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('name', formData.name);
            // formDataToSubmit.append('calculation', formData._id);
            if (formData.image) {
                formDataToSubmit.append('image', formData.image);
            }

            try {
                await axios.put(`http://3.111.47.151:5000/api/2d-images/${editData._id}`, formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
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
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            error={!!errors.name}
                        />
                        {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}

                        <Select
                            label="Calculation"
                            name="calculation"
                            value={formData.calculation.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            error={!!errors.calculation}
                            displayEmpty
                            style={{ marginTop: '1rem' }}
                        >
                            <MenuItem value={formData.calculation.name}>{formData.calculation.name}</MenuItem>
                        </Select>
                        {errors.calculation && <FormHelperText error>{errors.calculation}</FormHelperText>}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginTop: '1rem' }}
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
        name: PropTypes.string,
        calculation: PropTypes.string,
        image: PropTypes.any
    })
};

export default EditCalculationModal;
