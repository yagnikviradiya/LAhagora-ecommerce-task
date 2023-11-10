import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { isStoreOwner, logoutUser } from '../utils';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Appbar = ({ title }) => {
  const { cartItems } = useCart();
  console.log(cartItems ,'cartItems cartItems ');
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title || 'Test Site'}
        </Typography>
        {(
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={logoutUser}>
            Logout
          </Button>
        )}
        {(!isStoreOwner()) && (<IconButton onClick={()=>{navigate("/cart")}} color="inherit">
          <Badge badgeContent={cartItems?.cart?.length || 0} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>)}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
