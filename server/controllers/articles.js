const Article = require('../models/articles')

class Controller {

 static getArticle(req, res) {
   Article.find()
     .then(articles => {
       res.status(200).json(articles)
     })
     .catch(err => {
       res.status(500).json({error: err.message})
     })
 }

 static createArticle(req, res) {
   let newArticle = {
     title: req.body.title,
     content: req.body.content,
     userId: req.decoded.id
   }

   Article.create(newArticle)
     .then(article => {
       res.status(201).json(newArticle)
     })
     .catch(err => {
       res.status(500).json({error: err.message})
     })
 }

 static deleteArticle(req, res) {
   Article.deleteOne({_id: req.params.id})
     .then(() => {
       res.status(200).json({message: 'Article deleted!', id: req.params.id})
     })
     .catch(err => {
       res.status(500).json({error: err.message})
     })
 }

  static editArticle(req,res){  
        Article.findOneAndUpdate({ _id: req.params.id },{
            title : req.body.title,
            content : req.body.content
        })
        .then(article =>{
            res.status(200).json({
                id:req.params.id,
                msg : `Article has with title ${article.title} been edited`,
                title : article.title,
                content : article.content,
                userId:req.decoded._id
            })
        })
        .catch(error =>{
            res.status(500).json({ msg : 'Error: ',error});
        })  
    }

}

module.exports = Controller