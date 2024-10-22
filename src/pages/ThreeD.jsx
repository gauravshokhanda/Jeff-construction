import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Typography,
} from "@mui/material";

const PropertyForm = () => {
    const [formData, setFormData] = useState({
        width: "",
        length: "",
        area: "",
        laborCharge: "",
        clubHouse: false,
        garden: false,
        swimmingPool: false,
        carParking: false,
        gym: false,
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageUpload = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send to backend API)
        console.log(formData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}
        >
            <Typography variant="h5" gutterBottom>
                Property Details Form
            </Typography>

            {/* Image Upload */}
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

            {/* Width */}
            <TextField
                fullWidth
                label="Width"
                name="width"
                value={formData.width}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
            />

            {/* Length */}
            <TextField
                fullWidth
                label="Length"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
            />

            {/* Area */}
            <TextField
                fullWidth
                label="Area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
            />

            {/* Labour Charge */}
            <TextField
                fullWidth
                label="Labour Charge"
                name="laborCharge"
                value={formData.laborCharge}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
            />

            {/* Amenities */}
            <Typography variant="h6" gutterBottom>
                Amenities
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        name="clubHouse"
                        checked={formData.clubHouse}
                        onChange={handleInputChange}
                    />
                }
                label="Club House"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="garden"
                        checked={formData.garden}
                        onChange={handleInputChange}
                    />
                }
                label="Garden"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="swimmingPool"
                        checked={formData.swimmingPool}
                        onChange={handleInputChange}
                    />
                }
                label="Swimming Pool"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="carParking"
                        checked={formData.carParking}
                        onChange={handleInputChange}
                    />
                }
                label="Car Parking"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="gym"
                        checked={formData.gym}
                        onChange={handleInputChange}
                    />
                }
                label="Gym"
            />

            {/* Submit Button */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 2,
                }}
            >
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default PropertyForm;

