const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/hotel.db');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwtUtils');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const getAllUsers = (req, res) => {
    const query = `
        SELECT 
            users.id,
            users.name,
            users.email,
            users.phone,
            users.dob,
            countries.name AS nationality,
            users.password
        FROM users
        JOIN countries ON users.nationality_id = countries.id
    `;


    db.all(query, [], (err, rows) => {
        if (err) {
            console.log("Error", err.message);
            res.status(500).json({ error: 'Failed to fetch users' });
        } else {
            res.status(200).json(rows);
        }
    });
};


const AddNewCategory = (req, res)=>
{
    const name = req.body.name;
    const query = 'INSERT INTO menu_categories (name) VALUES (?)';

    db.run(query,[name],err=>
    {
        if(err)
        {
            res.status(500).json({errors: 'Failed to add new category'});
        }
        else
        {
            res.status(200).json({success:'Category has been added'});

        }
    })
}

const GetAllCategories =(req,res)=>
{
    const query = 'SELECT * FROM menu_categories';

    db.all(query,[], (err,rows)=>
    {
        if(err)
        {
            res.status(500).json({error:'Failed to fetch categories'});
        }
        else{

            res.status(200).json(rows);
        }
    })
}




const AddNewItem = (req, res) => {
    console.log("AddNewItem route hit");

    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ error: 'Failed to upload image', details: err.message });
        }

        const body = req.body;
        console.log("Request body:", body);

        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const query = 'INSERT INTO menu_items (name, description, price, available, category_id, image) VALUES (?, ?, ?, ?, ?, ?)';
        const arr = [body.name, body.description, body.price, body.available, body.category_id, imagePath];

        console.log("Running DB query with values:", arr);

        db.run(query, arr, (err) => {
            if (err) {
                console.error('DB insert error:', err);
                return res.status(500).json({ error: 'Failed to insert item', details: err.message });
            } else {
                return res.status(200).json({ success: 'Item has been added successfully' });
            }
        });
    });
};


const UpdateItem = (req, res) => {
   
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload image' });
      }
      
      const body = req.body;
      
      const imagePath = req.file ? `/uploads/${req.file.filename}` : body.image || '';
  
     
      const query = `
        UPDATE menu_items 
        SET name = ?, description = ?, price = ?, available = ?, category_id = ?, image = ? 
        WHERE id = ?
      `;
      const arr = [
        body.name,
        body.description,
        body.price,
        body.available,
        body.category_id,
        imagePath,
        body.id,
      ];
  
      db.run(query, arr, (err) => {
        if (err) {
          console.error('Error updating item:', err);
          return res.status(500).json({ error: 'Failed to update item' });
        }
        res.status(200).json({ success: 'Item has been updated successfully' });
      });
    });
  };


const DeleteItem = (req, res) => {
    const id = req.body.id;
    const query = 'DELETE FROM menu_items WHERE id = ?';
    
    db.run(query, [id], err => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete item' });

        } else {
            res.status(200).json({ success: 'Item was deleted' });

        }
    });
};

const GetAllItems = (req, res) => {
    
    const query = 'SELECT * FROM menu_items';
    
    db.all(query, [], (err, rows) => {
        if (err) {


            res.status(500).json({ error: 'Failed to fetch items' });
        } else {

            res.json(rows);
        }
    });
};

const GetItemsByCategory = (req, res) => {
    const catid = req.body.id;
    const query = 'SELECT * FROM menu_items WHERE category_id = ?';
    
    db.all(query, [catid], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch items by category' });
        } else {
            res.json(rows);
        }
    });
};

const DeleteCategory = (req, res) => {
    const id = req.body.id;
    const query = 'DELETE FROM menu_categories WHERE id = ?';
    
    db.run(query, [id], err => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete item' });

        } else {
            res.status(200).json({ success: 'Item was deleted' });

        }
    });
};


const UpdateCategory = (req, res) => {
    const body = req.body;

    const query = 'UPDATE menu_categories SET name = ? WHERE id = ?';

    db.run(query, [body.name, body.id], function (err) {
        if (err) {


            res.status(500).json({ error: 'Failed to update category' });
        }
        
        else {

            res.json({ message: 'Category updated successfully' });
        }
    });
};

const getUserById = (req, res) => {
    const userId = req.params.id;
    const query = `
      SELECT
        users.id,
        users.name,
        users.email,
        users.phone,
        users.dob,
        countries.name AS country
      FROM users
      JOIN countries ON users.nationality_id = countries.id
      WHERE users.id = ?
    `;
    console.log(query, userId);
  
    db.get(query, [userId], (err, row) => {
      if (err) {
        console.error('Error', err.message);
        return res.status(500).json({ error: 'Failed to fetch user details' });
      }
      res.status(200).json(row);
    });
  };

  const getUserBookings = (req, res) => {
    const userId = req.params.id;
    const query = `
      SELECT
        booking_id,
        check_in,
        check_out,
        room_type,
        booking_confirmed
      FROM bookings
      WHERE user_id = ?
      ORDER BY check_in DESC
    `;
    console.log(query, userId);
  
    db.all(query, [userId], (err, rows) => {
      if (err) {
        console.error('Error', err.message);
        return res.status(500).json({ error: 'Failed to fetch bookings history' });
      }
      res.status(200).json(rows);
    });
  };

  const GetAllBookings = (req, res) => {
    const query = `
      SELECT
        b.booking_id,
        b.check_in,
        b.check_out,
        b.room_type,
        b.booking_confirmed,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email
      FROM bookings b
      JOIN users u ON b.user_id = u.id;
    `;
  
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error fetching bookings:', err.message);
        return res.status(500).json({ error: 'Failed to fetch bookings' });
      }
      res.status(200).json(rows);
    });
  };
  
  const UpdateBookingConfirmation = (req, res) => {
    const { bookingId } = req.params;
    const { booking_confirmed } = req.body;
  
    if (booking_confirmed === undefined) {
      return res.status(400).json({ error: 'Missing booking_confirmed in request body' });
    }
  
    const updateQuery = 'UPDATE bookings SET booking_confirmed = ? WHERE booking_id = ?';
    db.run(updateQuery, [booking_confirmed, bookingId], function (err) {
      if (err) {
        console.error('Error updating booking:', err.message);
        return res.status(500).json({ error: 'Failed to update booking' });
      }
  
      if (this.changes > 0) {
        const selectQuery = `
          SELECT
            b.booking_id,
            b.check_in,
            b.check_out,
            b.room_type,
            b.booking_confirmed,
            u.id AS user_id,
            u.name AS user_name,
            u.email AS user_email
          FROM bookings b
          JOIN users u ON b.user_id = u.id
          WHERE b.booking_id = ?;
        `;
        db.get(selectQuery, [bookingId], (err, row) => {
          if (err) {
            console.error('Error fetching updated booking:', err.message);
            return res.status(500).json({ error: 'Failed to fetch updated booking' });
          }
          if (row) {
            res.status(200).json(row);
          } else {
            res.status(404).json({ message: 'Booking updated, but not found' });
          }
        });
      } else {
        res.status(404).json({ message: 'Booking not found' });
      }
    });
  };

  const GetPendingOrders = (req, res) => {
    const query = `
      SELECT
        mo.id AS id,
        mo.booking_id,
        mo.quantity,
        mo.status,
        mi.id AS menu_item_id,
        mi.name AS name,
        mi.price,
        b.room_type,
        u.name AS user_name
      FROM menu_orders mo
      JOIN menu_items mi ON mo.menu_item_id = mi.id
      JOIN bookings b ON mo.booking_id = b.booking_id
      JOIN users u ON b.user_id = u.id
      WHERE mo.status = 'pending';
    `;
  
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error fetching pending orders:', err.message);
        return res.status(500).json({ error: 'Failed to fetch pending orders' });
      }
      res.status(200).json(rows);
    });
  };

  const UpdateOrderStatus = (req, res) => {
    const { orderId } = req.params;
    const updateQuery = 'UPDATE menu_orders SET status = ? WHERE id = ?';
    const completedStatus = 'completed';
  
    db.run(updateQuery, [completedStatus, orderId], function (err) {
      if (err) {
        console.error('Error completing order:', err.message);
        return res.status(500).json({ error: 'Failed to complete order' });
      }
  
      if (this.changes > 0) {
        res.status(200).json({ message: `Order ${orderId} marked as completed` });
      } else {
        res.status(404).json({ message: `Order ${orderId} not found` });
      }
    });
  };

  const LoginAdmin = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    const query = 'SELECT admin_id, name, email, password, role FROM admin WHERE email = ?';
  
    db.get(query, [email], async (err, row) => {
      if (err) {
        console.error('Error during admin login:', err.message);
        return res.status(500).json({ error: 'Login failed due to a database error' });
      }
  
      if (!row) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      try {
        const match = await bcrypt.compare(password, row.password);
        if (!match) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
  

        const admin = {
          id: row.admin_id,
          name: row.name,
          email: row.email,
          role: row.role,
        };
  
      
        const token = generateToken({ userid: admin.id, role: admin.role });
  
        
        return res.status(200).json({ token, admin });
      } catch (bcryptErr) {
        console.error('Error comparing passwords:', bcryptErr.message);
        return res.status(500).json({ error: 'Login failed due to a server error' });
      }
    });
  };

  const RegisterAdmin = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    // Validate required fields
    if (!name || !email || !password || typeof role === 'undefined') {
      return res.status(400).json({ error: 'Name, email, password, and role are required.' });
    }
  
    // Optional: ensure role is within allowed range
    const allowedRoles = [0, 1, 2, 3, 4];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role specified.' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO admin (name, email, password, role) VALUES (?, ?, ?, ?)';
  
      db.run(query, [name, email, hashedPassword, role], function (err) {
        if (err) {
          console.error('Error registering new admin:', err.message);
          return res.status(500).json({ error: 'Failed to register new admin.' });
        }
        res.status(201).json({
          message: `Admin user "${name}" registered successfully with role ${role}.`,
        });
      });
    } catch (bcryptErr) {
      console.error('Error hashing password:', bcryptErr.message);
      return res.status(500).json({ error: 'Failed to register new admin due to password hashing error.' });
    }
  };
  


  

module.exports = 
{
    getAllUsers,
    AddNewCategory,
    GetAllCategories,
    AddNewItem,
    UpdateItem,
    DeleteItem,
    GetAllItems,
    GetItemsByCategory,
    DeleteCategory,
    UpdateCategory,
    getUserById,
    getUserBookings,
    GetAllBookings,
    UpdateBookingConfirmation,
    GetPendingOrders,
    UpdateOrderStatus,
    LoginAdmin,
    RegisterAdmin,

}