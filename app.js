const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const Post = require('./models/Post');

const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

// Temlate Engine 
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    const posts = await Post.find({}).sort('-dateCreated');
    res.render('index', {
        posts
    });  
});

// Single post pages
app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post
    });  
});

app.get('/about', (req, res) => {
    res.render('about');  
});

app.get('/add_post', (req, res) => {
    res.render('add_post');  
});

app.get('/post', (req, res) => {
    res.render('post');  
});

app.post('/posts', async (req, res) =>{
    await Post.create(req.body);
    res.redirect('/');
});

app.get('/posts/edit/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.render('edit', {
        post
    });
});

// Update 
app.put('/posts/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    post.title = req.body.title;
    post.detail  = req.body.detail;
    post.save();

    res.redirect(`/posts/${req.params.id}`);
});

// Delete
app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`);
});