
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

//register partial to use partials like navbar
hbs.registerPartials(__dirname + "/views/partials");



app.get('/', (req, res, next) => {
  res.render('index'); 
});

app.get('/beer', (req, res, next) => {

  punkAPI
  .getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => {
    next(error);
  });

   
});

app.get('/randomBeer', (req, res, next) => {

  punkAPI
  .getRandom()
  .then(beer => {
    res.render('randomBeer', {beer});
  })
  .catch(error => {
    next(error);
  });
   
});





app.listen(3000);
