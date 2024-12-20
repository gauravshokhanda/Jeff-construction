import { useState } from 'react';
import { Stack, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../../redux/Slices/authSlice";

export default function SignUpForm() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error); 
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '', 
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
        if (!formValues.role) {
            tempErrors.role = 'Role is required';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // If no errors, validation passed
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            
            await dispatch(register({
                name: formValues.name,
                email: formValues.email,
                password: formValues.password,
                role: formValues.role,
            }));

           
            setFormValues({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
            });
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                {error && <Alert severity="error">{error}</Alert>} 
                <TextField
                    name="name"
                    label="Full Name"
                    value={formValues.name}
                    onChange={handleChange}
                    error={!!errors.name} 
                    helperText={errors.name} 
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

                <FormControl fullWidth error={!!errors.role}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        name="role"
                        value={formValues.role}
                        onChange={handleChange}
                        label="Role"
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="contractor">Contractor</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                    {errors.role && <p style={{ color: 'red', margin: 0 }}>{errors.role}</p>}
                </FormControl>

                <Button fullWidth size="large" type="submit" variant="contained">
                    Sign Up
                </Button>
            </Stack>
        </form>
    );
}
