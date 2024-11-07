import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, TextField } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';

function TemplatePreviewer() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');  // Property name
    const [area, setArea] = useState('');  // Property area
    const [propertyId, setPropertyId] = useState(null); // ID of the added property

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleFormSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('area', area);
        if (file) {
            formData.append('thumbnail', file);
        }

        try {
            let response;
            if (isEditing) {
                // Update existing property
                console.log("editing id", propertyId)
                response = await axios.put(`http://localhost:5000/api/properties/${propertyId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                response = await axios.post('http://localhost:5000/api/properties/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
              
            }

            if (response.data.success) {
                alert(isEditing ? 'Property updated successfully!' : 'Property added successfully!');

                console.log("propertyId", response.data.data._id)
                setPropertyId(response.data.data._id);
                // After adding, switch to edit mode
                if (!isEditing) {
                    setIsEditing(true);
                }
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'adding'} property:`, error);
            alert(`Failed to ${isEditing ? 'update' : 'add'} property.`);
        }
    };

    return (
        <Card sx={{ width: 400, margin: '0 auto', boxShadow: 3 }}>
            <CardContent>
                {/* Header */}
                <Box display="flex" alignItems="center" mb={2}>
                    <UploadFileIcon sx={{ color: '#2C5CC5', fontSize: 30, mr: 1 }} />
                    <Typography variant="h6" color="primary">
                        {isEditing ? 'Edit Property' : 'Add Property'}
                    </Typography>
                </Box>

                {/* File Upload Area */}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        border: '2px dashed #d3d3d3',
                        borderRadius: 2,
                        padding: 3,
                        mb: 2,
                        textAlign: 'center',
                        color: '#4a4a4a',
                    }}
                >
                    {preview ? (
                        <img src={preview} alt="File Preview" style={{ width: '40%', height: 'auto', marginBottom: '10px' }} />
                    ) : (
                        <>
                            <UploadFileIcon sx={{ fontSize: 40, color: '#9e9e9e' }} />
                            <Typography variant="body2">Upload your thumbnail here</Typography>
                            <Typography variant="body2" color="textSecondary">
                                JPG (600 × 720px)
                            </Typography>
                        </>
                    )}
                    <Button variant="contained" component="label" sx={{ mt: 2 }}>
                        Choose file
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                </Box>


                {/* Text Fields */}
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="dense"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Area"
                    variant="outlined"
                    margin="dense"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Submit Button */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        background: 'linear-gradient(90deg, #2C5CC5 0%, #3E92CC 100%)',
                        color: 'white',
                        padding: 1,
                        mt: 2,
                    }}
                    onClick={handleFormSubmit}
                >
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </CardContent>
        </Card>
    );
}

export default TemplatePreviewer;
