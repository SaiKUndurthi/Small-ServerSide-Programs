const express = require('express');
const path  = require('path');
//Init app
const app = express();


const PORT = 3000;
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Home Route
app.get('/', (req,res)=>{
  let articles = [
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
];
  res.render("index", {
    title:'ARTICLES',
    articles: articles
  });
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
