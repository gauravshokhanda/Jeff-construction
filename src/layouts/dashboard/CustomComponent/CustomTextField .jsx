// CustomTextField.js
import React from 'react';
import { TextField } from '@mui/material';

// eslint-disable-next-line react/prop-types
const CustomTextField = ({ label, name, value, onChange, required }) => (
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

export default CustomTextField;



