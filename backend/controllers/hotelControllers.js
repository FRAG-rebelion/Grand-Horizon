const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/hotel.db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwtUtils');



const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, user) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal error' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const token = generateToken({ userid: user.id, email: user.email });

      const { password, ...userInfo } = user; 

      res.status(200).json({
        message: 'Login successful',
        token,
        user: userInfo,
      });
    });
  });
};

const register = (req, res) => {
  const { name, email, phone, nationality_id, dob, password } = req.body;


  if (!name || !email || !phone || !nationality_id || !dob || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }


  const checkEmailSql = `SELECT id FROM users WHERE email = ?`;
  db.get(checkEmailSql, [email], (err, existing) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'Database error.' });
    }

    if (existing) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }


    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'Error processing password.' });
      }

      
      const insertSql = `
        INSERT INTO users (name, email, phone, nationality_id, dob, password)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [name, email, phone, nationality_id, dob, hashedPassword];

      db.run(insertSql, params, function (err) {
        if (err) {

          console.error('Error inserting user:', err.message);
          return res.status(500).json({ error: 'Failed to register user.', details: err.message });

        }
        
        res.status(200).json({ message: 'Registration successful', userId: this.lastID });
      });
    });
  });
};

const GetMenuCategories = async (req, res) => {
    const query = 'SELECT * FROM menu_categories';
    db.all(query, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch menu categories' });
      } else {
        res.status(200).json(rows);
      }
    });
};
  
const GetMenuItems = async (req, res) => {
    const query = 'SELECT * FROM menu_items';
    db.all(query, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
      } else {
        res.status(200).json(rows);
      }
    });
};

const GetAllCountries = (req,res)=>
{

  const query = 'SELECT * FROM countries';

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch countries' });
    } else {
      res.status(200).json(rows);
    }
  });


};

const createBooking = (req, res) => {


  const { check_in, check_out, user_id, room_type } = req.body;

  
  if (!check_in || !check_out || !user_id || !room_type) {

    return res.status(400).json({ error: 'All booking fields are required.' });
  }

  
  const inDate  = new Date(check_in);

  const outDate = new Date(check_out);

  if (isNaN(inDate) || isNaN(outDate) || outDate <= inDate) {

    return res.status(400).json({ error: 'Invalid check-in/out dates.' });
  }

  
  const sql = `INSERT INTO bookings (check_in, check_out, user_id, room_type) VALUES (?, ?, ?, ?)`;
  
  const params = [check_in, check_out, user_id, room_type];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error inserting booking:', err.message);
      return res.status(500).json({ error: 'Failed to create booking.' });
    }

    
    res.status(200).json({message: 'Booking created'});
  });
};

const getBookingByUser = (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId);

    const query = `
      SELECT booking_id, check_in, check_out, user_id, room_type, booking_confirmed
      FROM bookings
      WHERE user_id = ? AND check_out > datetime('now')
      ORDER BY check_in DESC
      LIMIT 1;
    `;
    const values = [userId];


    db.get(query, values, (err, row) => {
      if (err) {
        console.error('Error fetching booking:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (row) {
          res.status(200).json(row);
        } else {
          res.status(200).json(null);
        }
      }
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const placeorders = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid order items' });
    }

    const bookingQuery = `
      SELECT booking_id
      FROM bookings
      WHERE user_id = ? AND check_out > datetime('now')
      ORDER BY check_in DESC
      LIMIT 1;
    `;

    const bookingValues = [userId];

    db.get(bookingQuery, bookingValues, async (err, bookingRow) => {
      if (err) {
        console.error('Error querying booking:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!bookingRow) {
        return res.status(400).json({ error: 'No active booking found for this user' });
      }

      const { booking_id } = bookingRow;

      try {
        for (const item of items) {
          const { itemId, quantity } = item;

          const insertQuery = `
            INSERT INTO menu_orders (booking_id, menu_item_id, quantity, status)
            VALUES (?, ?, ?, 'pending');
          `;

          await new Promise((resolve, reject) => {
            db.run(insertQuery, [booking_id, itemId, quantity], function (err) {
              if (err) {
                console.error('Error inserting order item:', err);
                reject(err);
              } else {
                resolve();
              }
            });
          });
        }

        res.status(201).json({ message: 'Order placed successfully', booking_id });

      } catch (insertError) {
        console.error('Error inserting order items:', insertError);
        return res.status(500).json({ error: 'Failed to insert order items' });
      }
    });

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  GetMenuCategories,
  GetMenuItems,
  register,
  GetAllCountries,
  login,
  createBooking,
  getBookingByUser,
  placeorders,


}