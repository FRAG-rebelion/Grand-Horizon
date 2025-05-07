import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${id}/bookings`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings history:', err);
      }
    };

    fetchUser();
    fetchHistory();
  }, [id]);

  if (!user) {
    return <Typography>Loading user details...</Typography>;
  }

  return (
    <Container>
      <Button onClick={() => navigate('/users')} style={{ marginTop: '20px' }}>
        Back to Users
      </Button>

      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        {user.name} — Details
      </Typography>

      <Typography variant="subtitle1">
        Email: {user.email}
      </Typography>
      <Typography variant="subtitle1">
        Phone: {user.phone}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Country: {user.country}
      </Typography>

      <Typography variant="h5" gutterBottom style={{ marginTop: '30px' }}>
        Booking History
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Booking ID</strong></TableCell>
              <TableCell><strong>Check In</strong></TableCell>
              <TableCell><strong>Check Out</strong></TableCell>
              <TableCell><strong>Room Type</strong></TableCell>
              <TableCell><strong>Confirmed</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((b) => (
              <TableRow key={b.booking_id}>
                <TableCell>{b.booking_id}</TableCell>
                <TableCell>{new Date(b.check_in).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(b.check_out).toLocaleDateString()}</TableCell>
                <TableCell>{b.room_type}</TableCell>
                <TableCell>{b.booking_confirmed ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default UserDetails;
