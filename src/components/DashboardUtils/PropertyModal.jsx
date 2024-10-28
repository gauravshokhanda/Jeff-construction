import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormHelperText,
} from '@mui/material';

function PropertyModal({ open, onClose }) {
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');

    const handleSave = () => {

        console.log(`Width: ${width}, Height: ${height}`);
        onClose(); 
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Calcualte</DialogTitle>
            <DialogContent>
                <TextField
                    label="Width"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
                <TextField
                    label="Height"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Close
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PropertyModal;
