const express = require('express');
const authRoutes = require('./auth/authRoutes');
const mainRoutes = require('./main/mainRoute');

const app = express();
app.use(express.json()); 

app.use('/', authRoutes); 
app.use('/', mainRoutes); 



module.exports = app;