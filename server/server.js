const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodbConnection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
// middleware
const singleFileUpload = require('./middleware/singleFileUpload');
const authenticateJWT = require('./middleware/auth');

// create express app
const app = express();
app.use(cors());

// Setup server port
const port = process.env.PORT || 3001;

// parse requests of content-type - application/x-www-form-urlencoded      
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to the mongo database
mongodbConnection();
//  for get the image
app.use('/images', express.static('./public/uploads'));

//User root route
app.use('/api/users', userRoutes);
//Product root route
app.use('/api/product', [authenticateJWT,singleFileUpload], productRoutes);
//Cart root route
app.use('/api/cart', [authenticateJWT,singleFileUpload], cartRoutes);


// listen for requests
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});

