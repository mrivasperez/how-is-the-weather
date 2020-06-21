// initiliaze npm packages
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Initialize express
const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../views/partials');

// Setup handlebars engine
app.set('view engine', 'hbs');
hbs.registerPartials('partialsPath');

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Setup what is served based on url visisted: