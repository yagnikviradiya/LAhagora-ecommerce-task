import React from 'react';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = cartItems?.totalPrice || 0;

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems?.cart?.length === 0 ? (
        <Typography variant="subtitle1" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems?.cart?.map((item) => (
              <Grid maxWidth={"200px"} item key={item?.product._id} xs={6}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                  <img src={item?.product.image} alt={item?.product.name} style={{ width: '100%', height: '200px' }} />
                  <Typography variant="h6">{item?.product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.product?.description}
                  </Typography>
                  <Typography variant="h6">Price:{item?.product.price}</Typography>

                  <Button variant="outlined" onClick={() => handleRemoveFromCart(item?.product._id)}>
                    Remove
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
          {cartItems?.cart?.length?(<Button variant="contained" color="primary" onClick={handleClearCart} sx={{ marginTop: '16px' }}>
            Clear Cart
          </Button>):<Typography>No item available</Typography>}
          <Typography variant="h6" sx={{ marginTop: '8px' }}>
            Total: ${total.toFixed(2)}
          </Typography>
        </>
      )}
    </Container>
  );
};

export default Cart;
