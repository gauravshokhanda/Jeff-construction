// CustomTextField.js
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const CustomTextField = ({ label, name, value, onChange, required, error, helperText }) => (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            margin="normal"
            required={required}
            error={error}
            helperText={helperText}
        />
    );


CustomTextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string

}
export default CustomTextField;



