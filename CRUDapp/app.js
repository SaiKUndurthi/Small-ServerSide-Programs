const express = require('express');
const path  = require('path');
const mongoose = require('mongoose');

//Connecting MongoDB using mongoose
mongoose.connect('mongodb://localhost/knowledge_base_app');
let db = mongoose.connection;

//Check for Db connection
db.once('open', ()=>{
  console.log('Connected to MongoDB');
})

//Check for Db errors
db.on('error', (err) => {
  console.log(err);
});

//Init app
const app = express();

//Bring in the model.
let Article = require('./models/article');

const PORT = 3000;
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Home Route
app.get('/', (req,res)=>{
Article.find({}, (err, articles)=>{
  if(err){
    console.log(err);
  }else{
    res.render("index", {
      title:'ARTICLES',
      articles: articles,
    });
  }
});
  /*let articles = [
    {
      id:1,
      title: 'First Article',
      author: 'SKU'
    },
    {
      id:2,
      title: 'Second Article',
      author: 'Sai'
    },
    {
      id:3,
      title: 'Third Article',
      author: 'Sai Krishna Undurthi'
    }
];*/

});

//Add Article Route
app.get('/articles/add', (req, res)=>{
  res.render('add_articles', {
    title:'Add Article'
  });
});

app.listen(PORT, ()=>{
  console.log("Server started on PORT ", PORT);
});
