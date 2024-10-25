import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
  
    Typography,
} from '@mui/material';

const AddTwoDModal = ({ openModal, closeModal, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        calculation: '',
        image: null,
    });
    const [calculations, setCalculations] = useState([]);

    useEffect(() => {
        const fetchCalculations = async () => {
            try {
                const response = await axios.get('http://3.111.47.151:5000/api/calculations/all', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setCalculations(response.data)
            } catch (error) {
                console.error("Error fetching calculations:", error);
            }
        };

        fetchCalculations();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        closeModal();
        setFormData({
            name: '',
            calculation: '',
            image: null,

        })
    };

    return (
        <Box>
            <Dialog open={openModal} onClose={closeModal} maxWidth="sm" fullWidth>
                <DialogTitle>Add New</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Button variant="outlined" component="label" sx={{ marginBottom: "16px" }}>
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </Button>
                        {formData.image && (
                            <Typography variant="body2">
                                Selected File: {formData.image.name}
                            </Typography>
                        )}

                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            sx={{ marginBottom: "16px", marginTop: "16px" }}
                        />

                        <FormControl fullWidth sx={{ marginBottom: "16px" }}>

                            <Select
                                name="calculation"
                                value={formData.calculation}
                                onChange={handleChange}
                                displayEmpty
                                sx={{ minWidth: 120, marginTop: "16px" }}
                            >
                                <MenuItem value="" disabled>
                                    Select Calculation
                                </MenuItem>
                                {calculations.map((calculation) => (
                                    <MenuItem key={calculation._id} value={calculation._id}>
                                        {calculation.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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

AddTwoDModal.propTypes = {
    openModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AddTwoDModal;
