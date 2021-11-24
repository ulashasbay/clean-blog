const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const Post = require('./models/Post');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

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
app.get('/', postController.getAllPosts);
// Post pages
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
// Update 
app.put('/posts/:id', postController.updatePost);
// Delete
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);
app.get('/post', pageController.getPostPage);
app.get('/posts/edit/:id', pageController.getEditPage);


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`);
});