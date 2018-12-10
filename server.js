const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

// Connect to mongoDB database
const dbConfig = require('./server/config/mongodb.config')
mongoose.connect(dbConfig.url, { useNewUrlParser: true });

//  Serve static files
app.use(bodyParser.json())
app.use(express.static('app'));
// Routing
require('./server/routes/user.route')(app)
//Set app to use express backend router
app.use(router);
// Configure port
const port = 3001;
// Listen to port
let server = app.listen(port, function(){
    console.log(`Server is running on port: ${port}`);
});
