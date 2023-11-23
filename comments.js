// Create web server with express
const express = require('express');
const app = express();
// Create a middleware to parse the body of the request
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Create a middleware to serve static files
app.use(express.static('public'));
// Create a middleware to manage the routes
const router = require('./routes');
app.use(router);
// Start the server
app.listen(3000, () => console.log('Listening on port 3000...'));

// Path: routes.js
// Create a router
const express = require('express');
const router = express.Router();
// Import the controller
const commentsController = require('./controllers/comments');
// Create the routes
router.get('/comments', commentsController.list);
router.post('/comments', commentsController.create);
router.delete('/comments/:id', commentsController.delete);
// Export the router
module.exports = router;

// Path: controllers/comments.js
// Import the model
const Comment = require('../models/comment');
// Create a controller
const commentsController = {};
// Create the route methods
commentsController.list = (req, res) => {
  Comment.find({}).exec((err, comments) => {
    if (err) {
      console.log('Error:', err);
    } else {
      res.render('../views/comments/index', {comments: comments});
    }
  });
};
commentsController.create = (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/comments');
    }
  });
};
commentsController.delete = (req, res) => {
  Comment.remove({_id: req.params.id}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/comments');
    }
  });
};
// Export the controller
module.exports = commentsController;