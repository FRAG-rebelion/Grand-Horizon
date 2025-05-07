import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  TableContainer,
  Paper,
  Typography,
} from '@mui/material';

function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/getallbookings');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleCheckIn = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5000/bookings/${bookingId}/checkin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booking_confirmed: 1 }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBooking = await response.json();
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.booking_id === bookingId ? { ...booking, booking_confirmed: updatedBooking.booking_confirmed } : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking:', error);
      
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const searchString = [
      booking.room_type, 
      booking.check_in,
      booking.check_out,
      booking.booking_id,
      booking.booking_confirmed ? 'Yes' : 'No',
      booking.user?.name || '',
      booking.user?.email || '',
    ].join(' ').toLowerCase();
    return searchString.includes(filter.toLowerCase());
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Bookings Management
      </Typography>

      <TextField
        label="Search bookings"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Check In Date</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Booking Confirmed</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.booking_id}>
                <TableCell>{booking.booking_id}</TableCell>
                <TableCell>{new Date(booking.check_in).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.check_out).toLocaleDateString()}</TableCell>
                <TableCell>
                  {booking.user ? (
                    <>
                      <div>{booking.user.name}</div>
                      <div style={{ fontSize: '0.8em', color: 'gray' }}>
                        {booking.user.email}
                      </div>
                    </>
                  ) : (
                    `User ID: ${booking.user_id}`
                  )}
                </TableCell>
                <TableCell>{booking.room_type}</TableCell>
                <TableCell>{booking.booking_confirmed ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  {!booking.booking_confirmed && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCheckIn(booking.booking_id)}
                    >
                      Check In
                    </Button>
                  )}
                  {booking.booking_confirmed && (
                    <Typography variant="body2" color="success">
                      Checked In
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default BookingsAdmin;