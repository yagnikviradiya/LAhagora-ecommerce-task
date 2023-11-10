import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper,
    Link,
    CircularProgress,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import regExValidation from '../../helpers/validations';
import { Api } from '../../services/Api';
import { toast } from 'react-toastify';
import ApiEndpoints from '../../services/ApiEndpoints';
import { useNavigate } from 'react-router-dom';

const Register = ({ handleRegister }) => {
    const [formData, setFormData] = useState({
        role: 'customer',
        name: '',
        email: '',
        password: '',
        phone: '',
        storeName: '',
        country: '',
    });
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear individual field errors when user types
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!regExValidation.email(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone is required';
        } else if (formData.phone && formData.phone.length !== 10) {
            newErrors.phone = 'Please enter a valid phone';
        }

        if (formData.role === 'customer') {
            if (!formData.country) {
                newErrors.country = 'Country is required';
            }
        } else if (formData.role === 'storeOwner') {
            if (!formData.storeName) {
                newErrors.storeName = 'Store Name is required';
            }
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            // Set individual field errors
            setErrors(newErrors);
            return;
        }

        // Reset errors
        setErrors({});

        // API call for registration
        try {
            setLoader(true)
            const dataTobeSent = { ...formData }
            dataTobeSent.isStoreOwner = (dataTobeSent?.role === "storeOwner")
            delete dataTobeSent?.role
            if (dataTobeSent.isStoreOwner)
                delete dataTobeSent?.country;

            const res = await Api.post(ApiEndpoints.user.register, dataTobeSent)
            setLoader(false);
            const data = res?.data
            console.log(data, 'datadatadata');
            if (data?.status) {
                navigate('/')
                toast.success("User registered")
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
                <Typography variant="h5" align="center" mb={2}>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    label="Role"
                                >
                                    <MenuItem value="customer">Customer</MenuItem>
                                    <MenuItem value="storeOwner">Store Owner</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
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
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                type="number"
                                value={formData.phone}
                                onChange={handleChange}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone}
                            />
                        </Grid>
                        {formData.role === 'customer' ? (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    error={Boolean(errors.country)}
                                    helperText={errors.country}
                                />
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Store Name"
                                    name="storeName"
                                    value={formData.storeName}
                                    onChange={handleChange}
                                    error={Boolean(errors.storeName)}
                                    helperText={errors.storeName}
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Button
                        startIcon={loader ? <CircularProgress color='inherit' /> : null}
                        type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid sx={{ marginTop: "10px" }} item>
                            <Link component={RouterLink} to="/" variant="body2">
                                Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Register;
