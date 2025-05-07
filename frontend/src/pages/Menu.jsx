import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]); // Renamed 'items' to 'menuItems' for clarity
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/allmenucategories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const res = await fetch('http://localhost:5000/allmenuitems');
        if (!res.ok) throw new Error('Failed to fetch items');
        const data = await res.json();
        setMenuItems(data); // Updated to setMenuItems
      } catch (err) {
        console.error('Failed to fetch items', err);
      }
    };

    fetchCategories();
    fetchMenuItems();
  }, []);

  const addItemToOrder = (menuItemId) => { // Changed function name for clarity
    setOrder(currentOrder => ({
      ...currentOrder,
      [menuItemId]: (currentOrder[menuItemId] || 0) + 1,
    }));
  };

  const removeItemFromOrder = (menuItemId) => {  // Changed function name for clarity
    setOrder(currentOrder => {
      const currentQuantity = currentOrder[menuItemId] || 0;
      const newQuantity = currentQuantity - 1;

      if (newQuantity <= 0) {
        // If the quantity is zero or less, remove the item from the order
        const { [menuItemId]: _, ...remainingOrder } = currentOrder;
        return remainingOrder;
      }

      // Otherwise, update the quantity
      return { ...currentOrder, [menuItemId]: newQuantity };
    });
  };

  const orderDetails = useMemo(() => {
    // Calculate the details of the items in the order
    const orderedItems = Object.entries(order); // Get an array of [menuItemId, quantity] pairs
    const detailedItems = orderedItems.map(([menuItemId, quantity]) => {
      const menuItem = menuItems.find(item => item.id === +menuItemId); // Find the full item data
      return menuItem && { ...menuItem, quantity, subtotal: menuItem.price * quantity }; //return new object
    });
    return detailedItems.filter(Boolean); // Remove any undefined items (if a menuItem wasn't found)
  }, [order, menuItems]);

  const total = useMemo(() => {
    // Calculate the total price of the order
    return orderDetails.reduce((sum, item) => sum + item.subtotal, 0);
  }, [orderDetails]);

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (!user) {
      alert('Please sign in to place an order.');
      return;
    }

    try {
      const userId = user.id;
      const res = await fetch(`http://localhost:5000/getbookingbyuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch booking: ${res.status}`);
      }
      const bookingData = await res.json();
      if (!bookingData) {
        alert('');
        console.log("user has no booking");
      }
      if (bookingData && bookingData.booking_confirmed === false) {
        alert('You must be checked in to order.');
        return;
      }
    } catch (error) {
      console.error('Error checking booking confirmation:', error);
      alert('Error checking booking confirmation. Please try again.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/placeorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderDetails.map(item => ({ itemId: item.id, quantity: item.quantity })),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to place order: ${res.status} - ${errorData?.message || 'Unknown error'}`);
      }

      alert('Order placed!');
      navigate('/');
    } catch (err) {
      console.error('Error placing order', err);
      alert(`Failed to place order: ${err.message}`);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" mb={3}>
        Our Menu
      </Typography>

      {categories.map(category => (
        <Box key={category.id} mb={4}>
          <Typography variant="h5" mb={1}>{category.name}</Typography>
          <ImageList cols={4} rowHeight="auto" gap={8}>
            {menuItems
              .filter(item => item.category_id === category.id)
              .map(menuItem => (
                <ImageListItem key={menuItem.id} sx={{ flexDirection: 'column' }}>
                  <Box sx={{ position: 'relative', width: '100%', height: 180, overflow: 'hidden' }}>
                    <img
                      src={`http://localhost:5000${menuItem.image}`}
                      alt={menuItem.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <ImageListItemBar
                      title={menuItem.name}
                      subtitle={`$${menuItem.price.toFixed(2)}`}
                      actionIcon={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            onClick={() => removeItemFromOrder(menuItem.id)}
                            disabled={!order[menuItem.id]}
                            size="small"
                            sx={{ color: 'white' }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ mx: 0.5, color: 'white' }}>
                            {order[menuItem.id] || 0}
                          </Typography>
                          <IconButton
                            onClick={() => addItemToOrder(menuItem.id)}
                            size="small"
                            sx={{ color: 'white' }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      }
                      sx={{
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      py: 0.4,
                      px: 0.8,
                      overflow: 'hidden',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      fontSize: '0.85rem',
                      textAlign: 'center',
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: 2,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                    }}
                  >
                    {menuItem.description}
                  </Typography>
                </ImageListItem>
              ))}
          </ImageList>
        </Box>
      ))}

      <Paper elevation={3} sx={{ p: 2, position: 'sticky', top: 80, maxWidth: 360, ml: 'auto' }}>
        <Typography variant="h6" align="center" mb={2}>Your Order</Typography>
        <Divider />
        <List>
          {orderDetails.length ? (
            orderDetails.map(item => (
              <ListItem key={item.id} sx={{ justifyContent: 'space-between' }}>
                <ListItemText
                  primary={`${item.name} x${item.quantity}`}
                  secondary={`$${item.subtotal.toFixed(2)}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" align="center" mt={2}>
              No items selected
            </Typography>
          )}
        </List>
        <Divider />
        <Box display="flex" justifyContent="space-between" my={2}>
          <Typography>Total:</Typography>
          <Typography>${total.toFixed(2)}</Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          disabled={!orderDetails.length}
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </Paper>
    </Box>
  );
}
