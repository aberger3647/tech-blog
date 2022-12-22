const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get post by id
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }]
    });
    const post = postData.get({ plain: true });
    const allComments = await Comment.findAll({ where: {
      post_id: req.params.id, },
      include: [{ model: User, attributes: ["username"] }] 
    });
    const comments = allComments.map((comment) =>
    comment.get({ plain: true }));
    res.render('post', { ...post, comments, loggedIn: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all posts
router.get('/', async (req, res) => {
    try {
      const allPosts = await Post.findAll( { include: [ { model: User }]});
      const posts = allPosts.map((post) =>
      post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.logged_in })
    } catch (err) {
      res.status(400).json(err);
    }
  })

// get user's posts (dashboard)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
       include: [{ model: Post }]
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', { ...user, loggedIn: req.session.logged_in });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;