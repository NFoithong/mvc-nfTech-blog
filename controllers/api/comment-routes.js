const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// get all comments
router.get('/', (req, res) => {
    console.log('===============');
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create new coments
router.post('/', withAuth, (req, res) => {
    //check session
    if (req.session) {
        Comment.create({
                comment_text: req.body.comment_text,
                // use the id from the session
                user_id: req.session.user_id,
                post_id: req.body.post_id
            })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});

// delete comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;