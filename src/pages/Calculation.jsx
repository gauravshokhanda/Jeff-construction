import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setCalculateData } from "../redux/Slices/CalculationSlice";

const Calculation = () => {
    const [formData, setFormData] = useState({
        width: "",
        length: "",
        area: "",
        laborCharge: "",
        amenities: {
            clubHouse: "",
            garden: "",
            swimmingPool: "",
            carParking: "",
            gym: "",
        },
        image: null,
    });
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAmenityChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            amenities: {
                ...prevData.amenities,
                [name]: value,
            },
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
        dispatch(setCalculateData(formData))
        setFormData({
            width: "",
            length: "",
            area: "",
            laborCharge: "",
            amenities: {
                clubHouse: "",
                garden: "",
                swimmingPool: "",
                carParking: "",
                gym: "",
            },
            image: null,
        })
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}
        >
            <Typography variant="h5" gutterBottom>
                Property Details Form in 2D
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


            <TextField
                fullWidth
                label="Club House"
                name="clubHouse"
                value={formData.amenities.clubHouse}
                onChange={handleAmenityChange}
                sx={{ marginBottom: "16px" }}
            />

            <TextField
                fullWidth
                label="Garden"
                name="garden"
                value={formData.amenities.garden}
                onChange={handleAmenityChange}
                sx={{ marginBottom: "16px" }}
            />

            <TextField
                fullWidth
                label="Swimming Pool"
                name="swimmingPool"
                value={formData.amenities.swimmingPool}
                onChange={handleAmenityChange}
                sx={{ marginBottom: "16px" }}
            />

            <TextField
                fullWidth
                label="Car Parking"
                name="carParking"
                value={formData.amenities.carParking}
                onChange={handleAmenityChange}
                sx={{ marginBottom: "16px" }}
            />

            <TextField
                fullWidth
                label="Gym"
                name="gym"
                value={formData.amenities.gym}
                onChange={handleAmenityChange}
                sx={{ marginBottom: "16px" }}
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

export default Calculation;
