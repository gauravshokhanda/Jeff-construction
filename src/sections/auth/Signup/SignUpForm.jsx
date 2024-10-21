import { useState } from 'react';
import { Stack, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register } from "../../../redux/Slices/authSlice";

export default function SignUpForm() {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({}); 

    const validateForm = () => {
        const tempErrors = {};

       
        if (!formValues.name) {
            tempErrors.name = 'Full Name is required';
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formValues.email) {
            tempErrors.email = 'Email is required';
        } else if (!emailRegex.test(formValues.email)) {
            tempErrors.email = 'Invalid email format';
        }

        
        if (!formValues.password) {
            tempErrors.password = 'Password is required';
        } else if (formValues.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters long';
        }

        
        if (!formValues.confirmPassword) {
            tempErrors.confirmPassword = 'Confirm Password is required';
        } else if (formValues.password !== formValues.confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(tempErrors);

        // If tempErrors object is empty, validation passed
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Dispatch the register action
            dispatch(register({
                name: formValues.name,
                email: formValues.email,
                password: formValues.password,
            }));

            // Clear the form
            setFormValues({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    name="name"
                    label="Full Name"
                    value={formValues.name}
                    onChange={handleChange}
                    error={!!errors.name} // Error handling
                    helperText={errors.name} // Display validation error
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formValues.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />

                <Button fullWidth size="large" type="submit" variant="contained">
                    Sign Up
                </Button>
            </Stack>
        </form>
    );
}
