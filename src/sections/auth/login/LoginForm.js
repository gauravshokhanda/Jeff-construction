import { useState } from 'react';
import { Stack, TextField, Button, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/Slices/authSlice';

export default function LoginForm() {
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(login(formValues));
    setLoading(false);
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
