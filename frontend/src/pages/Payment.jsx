import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import HotelIcon from '@mui/icons-material/Hotel';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function Payment() {
  const { state } = useLocation();
  const { room } = state || {};
  const navigate = useNavigate();

  const [user, setUser] = useState({ id: null, name: "", email: "", phone: "" });
  const [dates, setDates] = useState({ from: "", to: "" });
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvv: "", cardName: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const u = JSON.parse(stored);
      setUser({ id: u.id, name: u.name, email: u.email, phone: u.phone });
    }
  }, []);

  useEffect(() => {
    if (!room) {
      navigate("/");
    }
  }, [room, navigate]);

  useEffect(() => {
    const { from, to } = dates;
    if (from && to) {
      const start = new Date(from);
      const end = new Date(to);
      const diffTime = end - start;
      const diffDays = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
      setTotalPrice(diffDays * (room?.price || 0));
    } else {
      setTotalPrice(0);
    }
  }, [dates, room]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDates((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        check_in: dates.from,
        check_out: dates.to,
        user_id: user.id,
        room_type: `${room.name} - Floor ${room.floor}`,
      };

      const bookingRes = await fetch("http://localhost:5000/createbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const bookingData = await bookingRes.json();

      if (bookingRes.ok) {
        setSnackbar({
          open: true,
          message: bookingData.message || "Booking successful! Redirecting...",
          severity: "success",
        });

        // --- Trigger the email sending endpoint using async/await ---
        const emailPayload = {
          userEmail: user.email,
          roomType: `${room.name} - Floor ${room.floor}`,
          price: totalPrice,
          checkInDate: dates.from,
          checkOutDate: dates.to,
        };

        try {
          const emailRes = await fetch('http://localhost:5000/send-booking-confirmation-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailPayload),
          });

          const emailData = await emailRes.json();
          console.log('Confirmation email initiated:', emailData.message || emailData.error);
          if (emailData.message) {
            setSnackbar((prev) => ({ ...prev, message: prev.message + ' Confirmation email sent!', severity: 'success' }));
          } else if (emailData.error) {
            console.error('Error sending confirmation email:', emailData.error);
            setSnackbar((prev) => ({ ...prev, message: prev.message + ' Error sending confirmation email.', severity: 'warning' }));
          }
        } catch (error) {
          console.error('Error calling email endpoint:', error);
          setSnackbar((prev) => ({ ...prev, message: prev.message + ' Network error sending email.', severity: 'warning' }));
        }

        setTimeout(() => navigate("/"), 2000);
      } else {
        setSnackbar({
          open: true,
          message: bookingData.error || bookingData.message || "Booking failed. Please try again.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Network error. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 8 }, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
        Payment
      </Typography>
      <Divider sx={{ mb: 4, width: 80, mx: "auto", borderBottomWidth: 3, borderColor: "primary.main" }} />

      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 3,
          bgcolor: "background.paper",
          borderRadius: 3,
          overflow: "hidden",
          transition: "transform 0.3s, box-shadow 0.3s",
          '&:hover': { boxShadow: 6, transform: 'translateY(-4px)' },
        }}
      >

        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 4 },
            borderRight: { md: "1px solid #e0e0e0" },
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
            <PersonIcon color="primary" sx={{ mr: 1 }} /> Your Details
          </Typography>
          <TextField fullWidth label="Name" value={user.name} margin="normal" InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" value={user.email} margin="normal" InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone" value={user.phone} margin="normal" InputProps={{ readOnly: true }} sx={{ mb: 2 }} />

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
            <CalendarTodayIcon color="primary" sx={{ mr: 1 }} /> Booking Dates
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="From"
                name="from"
                type="date"
                value={dates.from}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="To"
                name="to"
                type="date"
                value={dates.to}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
            <HotelIcon color="primary" sx={{ mr: 1 }} /> Room Details
          </Typography>
          <TextField fullWidth label="Room" value={room?.name || ""} margin="normal" InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Floor"
                value={room?.floor || ""}
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Total Price"
                value={`$${totalPrice}`}
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Box>


        <Box sx={{ flex: 1, p: { xs: 3, md: 4 }, backgroundColor: "#fff" }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
            <CreditCardIcon color="primary" sx={{ mr: 1 }} /> Payment Information
          </Typography>
          <TextField
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={payment.cardNumber}
            onChange={handleChange}
            margin="normal"
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry (MM/YY)"
                name="expiry"
                value={payment.expiry}
                onChange={handleChange}
                margin="normal"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                type="password"
                value={payment.cvv}
                onChange={handleChange}
                margin="normal"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Name on Card"
            name="cardName"
            value={payment.cardName}
            onChange={handleChange}
            margin="normal"
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 600,
              letterSpacing: 1,
              borderRadius: 2,
              backgroundColor: 'primary.main',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
            }}
            onClick={handlePayment}
          >
            Complete Booking
          </Button>
        </Box>
      </Box>


      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Payment;