import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, alpha } from '@mui/material/styles';
import { Badge } from '@mui/material';
import { CartContext } from '../components/CartContext';
import Cart from './Cart';
import image6 from '../images/image6.png';

const pages = ['Restaurants', 'Dining Options', 'Pre-ordering', 'Cook List'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout', 'Login/SignUp'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const SearchResults = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1000,
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  maxHeight: '200px',
  overflowY: 'auto',
  top: '40px',
  color: 'black', 
}));

const ResponsiveAppBar = () => {
  const { state } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCart, setAnchorElCart] = useState(null);
  const navigate = useNavigate();

  const restaurants = [
    { name: 'Pizza Delight', id: 1 },
    { name: 'Spice Paradise', id: 2 },
    { name: 'Fried Feast', id: 3 },
    { name: 'Biryani Hub', id: 4 },
    { name: 'Snack Station', id: 5 },
  ];

  const handleSearch = (query) => {
    if (query) {
      const foundRestaurants = restaurants
        .filter((restaurant) =>
          restaurant.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSearchResults(foundRestaurants);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleResultClick = (restaurant) => {
    setSearchQuery(restaurant.name);
    setSearchResults([]);
    navigate(`/restaurants/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Clear user session (for example, removing the token or user data from localStorage)
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFC93C' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo with imported image */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={image6} alt="Logo" style={{ height: '40px' }} />
          </Typography>

          {/* Navigation Pages */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase().replace(/\s+/g, '-')}`}
                sx={{ my: 2, color: 'black', display: 'block' }} // Text color changed to black
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Search bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Restaurants…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
              <SearchResults>
                {searchResults.map((restaurant, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleResultClick(restaurant)}
                    sx={{ color: 'black' }} // Set the text color to black
                  >
                    {restaurant.name}
                  </MenuItem>
                ))}
              </SearchResults>
            )}
          </Search>

          {/* Cart and user profile icons */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="View Cart">
              <IconButton
                onClick={handleMenuOpen(setAnchorElCart)}
                sx={{ p: 0, color: 'black' }} // Changed to black
              >
                <Badge badgeContent={state.cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElCart}
              open={Boolean(anchorElCart)}
              onClose={handleMenuClose(setAnchorElCart)}
              sx={{ mt: '45px' }}
            >
              <MenuItem onClick={handleMenuClose(setAnchorElCart)}>
                <Cart />
              </MenuItem>
            </Menu>
          </Box>

          {/* User profile */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleMenuOpen(setAnchorElUser)} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleMenuClose(setAnchorElUser)}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleMenuClose(setAnchorElUser)();
                    if (setting === 'Login/SignUp') {
                      handleLoginClick();
                    } else if (setting === 'Logout') {
                      handleLogout();
                    }
                  }}
                >
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
