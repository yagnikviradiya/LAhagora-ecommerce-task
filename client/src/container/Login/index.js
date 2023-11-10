import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, Link, Paper, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';  
import { getUserRole, isAuthenticated, removeUserCredential, storeUserCredential } from '../../utils';
import regExValidation from '../../helpers/validations';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ApiEndpoints from '../../services/ApiEndpoints';
import { Api } from '../../services/Api';
import { toast } from 'react-toastify';

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // Redirect to /products if already authenticated
    console.log(isAuthenticated(), getUserRole());
    if (isAuthenticated() && getUserRole()) {
      navigate('/products');
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    // Validate email format
    if (!regExValidation.email(formData.email)) {
      setErrors({ email: 'Please enter a valid Email' });
      return;
    }
    // Validate password presence
    if (!formData.password) {
      setErrors({ email: '', password: 'Password is required' });
      return;
    }
    // Reset errors
    setErrors({});

    // API call for login
    try {
      setLoader(true)
      const res = await Api.post(ApiEndpoints.user.login, formData)
      setLoader(false);
      const data = res?.data
      if (data?.token, data?.roal) {
        removeUserCredential();
        storeUserCredential(data?.token, data?.roal)
        navigate('/products')
      } else { toast.error("somthing want wrong") }
    } catch (err) {
      setLoader(false)
      console.log(err, 'err');
      toast.error(err?.response?.data?.message ?? 'something want to wrong')
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: '80px', padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" mb={3}>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            startIcon={loader ? <CircularProgress color='inherit' /> : null}
            type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
