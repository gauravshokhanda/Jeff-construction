// CustomTextField.js
import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({ label, name, value, onChange, required }) => {
    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            margin="normal"
            required={required}
        />
    );
};

export default CustomTextField;



