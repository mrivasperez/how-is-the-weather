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
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Setup what is served based on url visisted:
app.get('', (req, res) => {
    res.render('index', {
        title: 'HOW IS THE WEATHER?'
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'Please enter the name of the city you would like to check the weather for in the search bar. '
    });
});


app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        message: 'Check the weather in a simple web application. See the current weather conditions and temperature of your favorite or current city without having to look out your window!'
    });
});


app.get('*', (req, res) => {
    res.render('404',{
        title: 'Error',
        message: '404 - Page not found.'
    });
});


// set port to 3000
app.listen(3000, () => {
    console.log('Connected at localhost:3000')
});