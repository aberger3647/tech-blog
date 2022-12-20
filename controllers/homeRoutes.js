const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/', async (req, res) => {
    try {
      const allPosts = await Post.findAll( { include: [ { model: User }]});
      const posts = allPosts.map((post) =>
      post.get({ plain: true }));
      res.render('homepage', { posts })
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
    console.log(user)
    res.render('dashboard', { ...user, loggedIn: true });

    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   // req.session.logged_in = true;
    // });

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