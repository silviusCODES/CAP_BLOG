import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));
// Serve static files (like CSS)

app.set('view engine', 'ejs');


// In-memory storage for posts
let posts = [];

app.get('/', (req, res) => {
    res.render('home', { posts });
});

app.get('/post/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
      res.render('post', { post });
    } else {
      res.redirect('/');
    }
});

app.get('/new-post', (req, res) => {
  res.render('new-post');
});


app.post('/add-post', (req, res) => {
    const { title, content } = req.body;
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    posts.push({ id, title, content });
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    // const { title, content } = req.body;
    const post = posts.find(p => p.id === parseInt(id));
    if (post) {
      return res.render('update', { post });
    }
    res.redirect('/');
});

app.post('/update/:id', (req, res) => {
  const { title, content } = req.body;
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    posts[postIndex] = { id: postId, title, content };
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
});
  
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
