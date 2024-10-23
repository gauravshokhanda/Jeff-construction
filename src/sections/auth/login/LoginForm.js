import { useState, useEffect } from 'react';
import { Stack, TextField, Button, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../redux/Slices/authSlice';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.auth); // get isAuthenticated flag from the auth state
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  // If the user is already authenticated, redirect to the dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Prevent access to login page if already authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(formValues)).then((result) => {
      setLoading(false);
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard'); // Navigate to dashboard on successful login
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <Button fullWidth size="large" type="submit" variant="contained" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
      </Stack>
    </form>
  );
}
