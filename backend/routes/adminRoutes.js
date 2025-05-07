const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const {authenticate} = require('../utils/tokenAuth');

router.get('/getallusers', adminController.getAllUsers);
router.post('/addcategory', adminController.AddNewCategory);
router.get('/getcategory', adminController.GetAllCategories);
router.post('/addnewitem', adminController.AddNewItem);
router.put('/updateitem', adminController.UpdateItem);
router.post('/deleteitem', adminController.DeleteItem);
router.get('/getallitems', adminController.GetAllItems);
router.post('/getitemsbycategory', adminController.GetItemsByCategory);
// router.post('/deletecategory', adminController.DeleteCategory);
router.put('/updatecategory', adminController.UpdateCategory);
router.get('/users/:id', adminController.getUserById);
router.get('/users/:id/bookings', adminController.getUserBookings);
router.get('/getallbookings', adminController.GetAllBookings);
router.put('/bookings/:bookingId/checkin', adminController.UpdateBookingConfirmation );

router.get('/orders/pending',adminController.GetPendingOrders );
router.put('/orders/:orderId/complete', adminController.UpdateOrderStatus);

router.post('/loginadmin', adminController.LoginAdmin);
router.post('/registeradmin',authenticate, adminController.RegisterAdmin);


module.exports = router;