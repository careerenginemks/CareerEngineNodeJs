const express = require('express')
const Customer = require('../models/CustomerSchema')
const Vendor = require('../models/VendorSchema')
const User = require('../models/UserSchema')
const Item = require('../models/ItemSchema')
const Transaction = require('../models/TransactionSchema')
// const Receipt = require('../models/Receipt')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const axios = require('axios')
const fetch = require('../middleware/fetchdetails');
const jwtSecret = "HaHa"
const multer = require('multer');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create a Multer storage configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set the destination folder for file uploads
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Set a unique filename for each uploaded file
    },
  });
  
  const upload = multer({ storage: storage });

//Creating a user and storing data to MongoDB Atlas, No Login Requiered
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('username').isLength({ min: 3 }),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            username: req.body.username,
            password: securePass,
            email: req.body.email,
            role: req.body.role
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
})
  
// Authentication a User, No login Requiered
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id,
                role: user.role
            }
        }
        console.log(data, "data");
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken, role:data.user.role})


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})




// var foodItems= require('../index').foodData;
// require("../index")
//Creating a user and storing data to MongoDB Atlas, No Login Requiered
// Route to create a new customer
router.post('/customers', async (req, res) => {
  try {
      const { name, contact, address } = req.body;
      const newCustomer = new Customer({ name, contact, address });
      const savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Route to get all customers
router.get('/customers', async (req, res) => {
  try {
      const customers = await Customer.find();
      res.json(customers);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to get a specific customer by ID
router.get('/customers/:customerId', async (req, res) => {
  try {
      const customerId = req.params.customerId;
      const customer = await Customer.findById(customerId);
      if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(customer);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to update a customer by ID
router.put('/customers/:customerId', async (req, res) => {
  try {
      const customerId = req.params.customerId;
      const { name, contact, address } = req.body;
      const updatedCustomer = await Customer.findByIdAndUpdate(customerId, { name, contact, address }, { new: true });
      if (!updatedCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(updatedCustomer);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to delete a customer by ID
router.delete('/customers/:customerId', async (req, res) => {
  try {
      const customerId = req.params.customerId;
      const deletedCustomer = await Customer.findByIdAndDelete(customerId);
      if (!deletedCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
      }
      res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Route to create a new vendor
router.post('/vendors', async (req, res) => {
  try {
      const { name, contact, address, interestRateSpread } = req.body;
      const newVendor = new Vendor({ name, contact, address, interestRateSpread });
      const savedVendor = await newVendor.save();
      res.status(201).json(savedVendor);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Route to get all vendors
router.get('/vendors', async (req, res) => {
  try {
      const vendors = await Vendor.find();
      res.json(vendors);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to get a specific vendor by ID
router.get('/vendors/:vendorId', async (req, res) => {
  try {
      const vendorId = req.params.vendorId;
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
          return res.status(404).json({ message: 'Vendor not found' });
      }
      res.json(vendor);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to update a vendor by ID
router.put('/vendors/:vendorId', async (req, res) => {
  try {
      const vendorId = req.params.vendorId;
      const { name, contact, address, interestRateSpread } = req.body;
      const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, { name, contact, address, interestRateSpread }, { new: true });
      if (!updatedVendor) {
          return res.status(404).json({ message: 'Vendor not found' });
      }
      res.json(updatedVendor);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to delete a vendor by ID
router.delete('/vendors/:vendorId', async (req, res) => {
  try {
      const vendorId = req.params.vendorId;
      const deletedVendor = await Vendor.findByIdAndDelete(vendorId);
      if (!deletedVendor) {
          return res.status(404).json({ message: 'Vendor not found' });
      }
      res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Route to create a new item
router.post('/items', async (req, res) => {
  try {
      const { itemName,description, weight, label, photo, customerId } = req.body;
      const newItem = new Item({ itemName,description, weight, label, photo, customerId });
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Route to get all items
router.get('/items', async (req, res) => {
  try {
      const items = await Item.find();

      res.json(items);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to get a specific item by ID
router.get('/items/:itemId', async (req, res) => {
  try {
      const itemId = req.params.itemId;
      const item = await Item.findById(itemId);
      if (!item) {
          return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to update an item by ID
router.put('/items/:itemId', async (req, res) => {
  try {
      const itemId = req.params.itemId;
      const { description, weight, label, photo, customerId, vendorId } = req.body;
      const updatedItem = await Item.findByIdAndUpdate(itemId, { description, weight, label, photo, customerId, vendorId }, { new: true });
      if (!updatedItem) {
          return res.status(404).json({ message: 'Item not found' });
      }
      res.json(updatedItem);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to delete an item by ID
router.delete('/items/:itemId', async (req, res) => {
  try {
      const itemId = req.params.itemId;
      const deletedItem = await Item.findByIdAndDelete(itemId);
      if (!deletedItem) {
          return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to get all items associated with a customerId
router.get('/customerWiseItem/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        // Find all items with the specified customerId
        const items = await Item.find({ customerId });
        if (!items) {
          return res.status(404).json({ message: 'No items found for the specified customer' });
        }
        res.status(200).json(items);
      } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  });

// Route to create a new transaction
router.post('/transactions', async (req, res) => {
    try {
        const { type, amount, interestRate, customerId, vendorId, itemId, date, notes } = req.body;
        
        // Validation checks
        if (type === 'Admin to Customer' && vendorId !== null) {
            return res.status(400).json({ message: 'Vendor ID should be null for Admin to Customer transactions' });
        }
        
        if (type === 'Admin to Vendor' && vendorId === null) {
            return res.status(400).json({ message: 'Vendor ID cannot be null for Admin to Vendor transactions' });
        }

        // Creating new transaction
        const newTransaction = new Transaction({ type, amount, interestRate, customerId, vendorId, itemId, date, notes });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all transactions
router.get('/transactions', async (req, res) => {
  try {
      const transactions = await Transaction.find();
      res.json(transactions);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to get a specific transaction by ID
router.get('/transactions/:transactionId', async (req, res) => {
  try {
      const transactionId = req.params.transactionId;
      const transaction = await Transaction.findById(transactionId);
      if (!transaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json(transaction);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to update a transaction by ID
router.put('/transactions/:transactionId', async (req, res) => {
  try {
      const transactionId = req.params.transactionId;
      const { type, amount, interestRate, customerId, vendorId, itemId, date, notes } = req.body;
      const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, { type, amount, interestRate, customerId, vendorId, itemId, date, notes }, { new: true });
      if (!updatedTransaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json(updatedTransaction);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Route to delete a transaction by ID
router.delete('/transactions/:transactionId', async (req, res) => {
  try {
      const transactionId = req.params.transactionId;
      const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
      if (!deletedTransaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router