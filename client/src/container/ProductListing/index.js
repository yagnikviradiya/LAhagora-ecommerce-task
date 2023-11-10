import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, IconButton, Container, Grid, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ApiEndpoints from '../../services/ApiEndpoints';
import { Api } from '../../services/Api';
import { getUserRole } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const userRole = getUserRole()
    const navigate = useNavigate();
    const { addToCart } = useCart();  

    const fetchProducts = async () => {
        try {
            const response = await Api.get(ApiEndpoints.product.list);
            const data = response?.data?.data
            console.log(data, 'responseresponse');
            setProducts(data?.length ? data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        // Fetch product listing from the API
        

        fetchProducts();
    }, []);

    const handleAddToCart = async(productId) => {

        // Implement logic to add the product to the cart
       await addToCart(productId)
       await fetchProducts()

    };

    return (
        <Container>
            {userRole === "storeOwner" && (<Stack direction={'row-reverse'}>
                <Button variant='contained' sx={{ marginTop: "20px" }} onClick={() => { navigate("/product/add") }}>Add product</Button>
            </Stack>)}
            {products.length === 0 ? (
                <Typography variant="h5" align="center" sx={{ marginTop: "50px" }}>
                    No products available.
                </Typography>
            ) : (
                <Grid sx={{ marginTop: "30px" }} container spacing={3}>
                    {products?.map((product) => (

                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={product?.name}
                                        height="140"
                                        image={product?.image}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product?.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product?.description}
                                        </Typography>
                                        <Typography variant="h6" color="text.primary">
                                            ${product?.price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {product?.quantity}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    {/* {userRole === 'storeOwner' && (
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                )} */}
                                    {userRole === 'customer' && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<ShoppingCartIcon />}
                                            onClick={() => handleAddToCart(product?._id)}
                                        >
                                            Add to Cart
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>)}
        </Container>
    );
};

export default ProductListing;
