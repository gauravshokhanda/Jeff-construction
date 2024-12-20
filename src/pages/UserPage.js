import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, TextField } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function TemplatePreviewer() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <Card sx={{ maxWidth: 400, margin: '0 auto', mt: 5, boxShadow: 3 }}>
            <CardContent>
                {/* Header */}
                <Box display="flex" alignItems="center" mb={2}>
                    <UploadFileIcon sx={{ color: '#2C5CC5', fontSize: 30, mr: 1 }} />
                    <Typography variant="h6" color="primary">
                        Framer Template Previewer
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
                    {file ? (
                        <Typography>{file.name}</Typography>
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

                {/* Input Fields */}
                <TextField
                    fullWidth
                    label="Template title"
                    variant="outlined"
                    margin="dense"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Your name"
                    variant="outlined"
                    margin="dense"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Price (incl. $)"
                    variant="outlined"
                    margin="dense"
                    sx={{ mb: 3 }}
                />

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
                    Preview Template
                </Button>
            </CardContent>
        </Card>
    );
}

export default TemplatePreviewer;
