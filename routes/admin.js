const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.post('/addNewProduct', adminController.addNewProduct);

// deleteing a product
 router.delete('/deleteProduct/:prodID', adminController.deleteProduct);

 router.put('/updateProduct',adminController.updateProduct);



module.exports = router;
