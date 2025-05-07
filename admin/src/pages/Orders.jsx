import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function OrdersPage() {
  const navigate = useNavigate();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/orders/pending');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Group orders by their main order ID
        const groupedOrders = data.reduce((acc, order) => {
          const orderId = order.id;
          if (!acc[orderId]) {
            acc[orderId] = {
              id: orderId,
              booking_id: order.booking_id,
              room_type: order.room_type,
              guest_name: order.user_name,
              status: order.status,
              items: [],
            };
          }
          acc[orderId].items.push({
            menu_item_id: order.menu_item_id,
            name: order.name,
            quantity: order.quantity,
            price: order.price,
          });
          return acc;
        }, {});
        setPendingOrders(Object.values(groupedOrders));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  const completeOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}/complete`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // After successful completion, remove the order from the local state
      setPendingOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (err) {
      console.error('Error completing order:', err);
      // Optionally, show an error message to the user
    }
  };

  const calcTotal = (items) =>
    items.reduce((sum, itm) => sum + itm.price * itm.quantity, 0).toFixed(2);

  if (loading) {
    return <Typography>Loading pending orders...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Pending Orders
      </Typography>

      {pendingOrders.length === 0 ? (
        <Typography>No pending orders.</Typography>
      ) : (
        pendingOrders.map((order) => (
          <Accordion key={order.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Typography variant="subtitle1">Order #{order.id}</Typography>
                <Typography variant="subtitle2">
                  Room: {order.room_type}
                </Typography>
                <Typography variant="subtitle2">
                  Guest: {order.guest_name}
                </Typography>
                <Typography variant="subtitle2">
                  Total: ${calcTotal(order.items)}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <List disablePadding>
                {order.items.map((item) => (
                  <ListItem
                    key={item.menu_item_id}
                    disableGutters
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <ListItemText
                      primary={`${item.name} × ${item.quantity}`}
                    />
                    <Typography>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 1 }} />

              <Box textAlign="right">
                <Button
                  variant="contained"
                  onClick={() => completeOrder(order.id)}
                >
                  Complete
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}

      <Box mt={3}>
        <Button variant="text" onClick={() => navigate('/home')}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}