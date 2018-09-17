const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const {article} = require('../middleware/isHim')

const articleController = require('../controllers/articles')

router.get('/', articleController.getArticle)

router.post('/',auth,articleController.createArticle)

router.delete('/:id',auth,article,articleController.deleteArticle)

router.put('/:id',articleController.editArticle)


module.exports = router;