import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const SidebarMenu = ({ orders }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
                <List>
                    {['Home', 'Restaurants', 'Orders', 'Profile'].map((text) => (
                        <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <List>
                    <ListItem>
                        <ListItemText primary={`Total Orders: ${orders.length}`} />
                    </ListItem>
                    {orders.map((order, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${order.restaurant} - Total: ₹${order.total}`} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default SidebarMenu;
