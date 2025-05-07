const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelControllers');
const {authenticate} = require('../utils/tokenAuth');

router.get('/allmenucategories', hotelController.GetMenuCategories);
router.get('/allmenuitems', hotelController.GetMenuItems);
router.post('/register', hotelController.register);
router.get('/getallcountries', hotelController.GetAllCountries);
router.post('/login', hotelController.login);
router.post('/createbooking', authenticate, hotelController.createBooking);
router.post('/getbookingbyuser', authenticate, hotelController.getBookingByUser);
router.post('/placeorders', authenticate, hotelController.placeorders);
module.exports = router;