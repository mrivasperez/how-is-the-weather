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
        title: 'HOW IS THE WEATHER?',
        description: 'check the weather without going outside'
    });
});

/* 
I was trying out query strings here...

app.get('/search', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You did not provide a location'
        })
    }

    console.log(req.query.search)

    res.send({
        seattle: {
            temperature: 75,
            conditions: 'raining'
        }
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
*/

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'THE HELP SECTION',
        description: `let's figure it out...`
    });
});


app.get('/about', (req, res) => {
    res.render('about',{
        title: 'ABOUT',
        description: 'a weather app'
    });
});


app.get('*', (req, res) => {
    res.render('404',{
        title: 'THIS IS A 404 ERROR',
        description: 'the page you were looking for was not found'
    });
});


// set port to 3000
app.listen(3000, () => {
    console.log('Connected at localhost:3000')
});