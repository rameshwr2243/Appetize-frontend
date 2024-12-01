import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext'; // Change to '../components/CartContext'
import { List, ListItem, ListItemText, Button } from '@mui/material';

const Cart = () => {
    const { state, dispatch } = useContext(CartContext);
    
    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    return (
        <List>
            {state.cart.map(item => (
                <ListItem key={item.id}>
                    <ListItemText primary={item.name} secondary={`$${item.price}`} />
                    <Button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>
                        Remove
                    </Button>
                </ListItem>
            ))}
        </List>
    );
};

export default Cart;
