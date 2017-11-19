const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');
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

//Body parser Middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

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

//Get single article
//Add Article Route
app.get('/articles/:id', (req, res)=>{
  Article.findById(req.params.id, (err, article)=>{
    res.render('article', {
      article: article
    });
  });
});

//Add Article Route
app.get('/articles/add', (req, res)=>{
  res.render('add_articles', {
    title:'Add Article'
  });
});

//Add Articles POST
app.post('/articles/add', (req, res)=>{
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;
  article.save((err)=>{
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/');
    }
  })
})


//Load Edit form
app.get('/article/edit/:id', (req, res)=>{
  Article.findById(req.params.id, (err, article)=>{
    res.render('edit_article', {
      title:'Edit Article',
      article: article
    });
  });
});

//Update submit POST
app.post('/articles/edit/:id', (req, res)=>{
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id:req.params.id}

  Article.update(query, article, (err)=>{
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/');
    }
  });
});


app.delete('/article/:id', (req, res)=>{
  let query = {_id:req.params.id}

  Article.remove(query, (err)=>{
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

app.listen(PORT, ()=>{
  console.log("Server started on PORT ", PORT);
});
