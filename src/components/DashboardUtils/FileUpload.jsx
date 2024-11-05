import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, TextField } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PropertyModal from "./PropertyModal"

function TemplatePreviewer() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
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

    const handleOpenModal = () => {
        setModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
    };

    const handleDimensionInput = (inputWidth, inputHeight) => {
        setWidth(inputWidth);
        setHeight(inputHeight);
    };

    return (
        <Card sx={{ width: 400, margin: '0 auto', boxShadow: 3 }}>
            <CardContent>
                {/* Header */}
                <Box display="flex" alignItems="center" mb={2}>
                    <UploadFileIcon sx={{ color: '#2C5CC5', fontSize: 30, mr: 1 }} />
                    <Typography variant="h6" color="primary">
                        Add Property
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


                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="dense"
                    sx={{ mb: 2 }}
                />
                <Box display="flex" flexDirection={"row"} alignItems="center"  mb={2}>
                    <Button onClick={handleOpenModal} variant="outlined">
                        Calculation
                    </Button>
                    {width !== null && height !== null && (
                        <Typography variant="body2" color="textSecondary" sx={{pl:1 }}>
                            Width: {width}, Height: {height}
                        </Typography>
                    )}
                </Box>

                {/* Preview Button */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        background: 'linear-gradient(90deg, #2C5CC5 0%, #3E92CC 100%)',
                        color: 'white',
                        padding: 1,
                    }}
                >
                    Add
                </Button>
            </CardContent>
            <PropertyModal open={modalOpen} onClose={handleCloseModal} onDimensionsSubmit={handleDimensionInput} />
        </Card>
    );
}

export default TemplatePreviewer;
