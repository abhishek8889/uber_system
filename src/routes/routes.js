const express = require('express');
const authRoutes = require('./auth/authRoutes');

const app = express();
app.use(express.json()); 
app.use('/', authRoutes); 



module.exports = app;