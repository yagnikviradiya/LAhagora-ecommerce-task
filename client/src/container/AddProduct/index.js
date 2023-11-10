import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import UploadFile from '../../components/UploadFile';
import { toast } from 'react-toastify';
import { Api } from '../../services/Api';
import ApiEndpoints from '../../services/ApiEndpoints';
import { useNavigate } from 'react-router-dom';
// import UploadFile from './UploadFile';

const AddProduct = ({ handleAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [loader, setLoader] = useState(false)

  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    } else if (isNaN(formData.price) || parseFloat(formData.price) >= 1000) {
      newErrors.price = 'Max 1000 price allow';
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) >= 1000) {
      newErrors.quantity = 'Max 1000 quantity allow';
    }

    if (images.length === 0) {
      newErrors.image = 'Image is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {



    } catch (error) {

    }



    try {
      setLoader(true)
      const datTobeSent = {
        ...formData,
        image: (images[0]?.file || null),
      }
      const formDataInstance = new FormData();
      formDataInstance.append("image", datTobeSent.image);
      formDataInstance.append("name", datTobeSent.name);
      formDataInstance.append("description", datTobeSent.description);
      formDataInstance.append("price", datTobeSent.price);
      formDataInstance.append("quantity", datTobeSent.quantity);

      const res = await Api.post(ApiEndpoints.product.add, formDataInstance)
      setLoader(false);
      const data = res?.data
      console.log(data, 'datadatadata');
      if (data?.status) {
        navigate('/products')
        toast.success("Product added")
      } else { toast.error("somthing want wrong") }
    } catch (err) {
      setLoader(false)
      console.log(err, 'err');
      toast.error(err?.response?.data?.message ?? 'something want to wrong')
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" align="center" mb={2}>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
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
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={Boolean(errors.price)}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              error={Boolean(errors.quantity)}
              helperText={errors.quantity}
            />
          </Grid>
          <Grid item xs={12}>
            <UploadFile images={images} setImages={setImages} />
            {errors.image && (
              <Typography variant="body2" color="error" mt={1}>
                {errors.image}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Button
          startIcon={loader ? <CircularProgress color='inherit' /> : null}
          type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Add Product
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
