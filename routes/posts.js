
const express = require('express');
const cors = require('cors');
const router = express.Router();
const Post = require('../models/Post.model');
const bodyParser = require('body-parser');

router.use(cors());
router.use(bodyParser.json());

// GET
router.get('/', async (req,res)=>{
    try {
        const posts = await Post.find();
        res.json(posts);
        
    } catch (error) {
        console.log(error);
        res.json({message:error.message});
    }

})

router.get('/:title', async (req,res)=>{
    try {
        const post = await Post.findOne({title:req.params.title});
        res.json(post);

    } catch (error) {
        console.log(error);
        res.json({message:error});
    }

//  const post = posts.find((p)=>{
//      return p.id === parseInt(req.params.id)
//  })
//  if(!post){
//      res.status(404).send('<h2>le post que vous tentez dafficher nexiste pas</h2>')
//  }

})

// POST ROUTE FOR CREATING A BLOG POST
router.post('/', async (req,res) =>{
//  const shema = Joi.object({
//      title: Joi.string().min(3).required(),
//      content: Joi.string().min(20).required(),
//      tags : Joi.array().items(Joi.string())
//  })
//  const result = shema.validate(req.body);
//  console.log(result.error);
//  if (result.error){
//      res.status(400).send(result.error.details[0].message)
//      return;
//  }
//  const post = {
//      id: posts.length+1,
//      title: req.body.title,
//      content: req.body.content,
//      tags: req.body.tags,
//  }
//  posts.push(post);
//  res.send(post);
console.log(req.body);
const post = new Post({
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
});
console.log(post);
try {
    const savedPost = await post.save();
    res.json(savedPost);
} catch (error) {
    console.warn(error);
    res.json({message: error.message});
}
})


// PUT ROUTE FOR UPDATING
//    return p.id === parseInt(req.params.id)
//  })

//  if(!post){
//      res.status(404).send('<h2>le post que vous tentez dafficher nexiste pas</h2>')
//  }
//  res.send(post);

// //***************  VERIFIER SI CE QU'ON A TAPER EST CORRECT **********************/

//  const shema = Joi.object({
//      title: Joi.string().min(3).required(),
//      content: Joi.string().min(20).required(),
//      tags : Joi.array().items(Joi.string())
//  })
//  const result = shema.validate(req.body);
//  console.log(result.error);
//  if (result.error){
//      res.status(400).send(result.error.details[0].message)
//      return;
//  }

// //*************** UPDATE LE POST ET RETOURNER LE POST  A L'ECRAN  **********************/

//  post.title = req.body.title;
//  post.content = req.body.content;
//  post.tags = req.body.tags;
//  console.log('updated stuff');
//  res.send(post);

// })
// router.put('/:id',(req,res)=>{

//  //********************** VERIFIER L'EXISTENCE DU POST  **********************//
 
//  const post = posts.find((p)=>{
  
    router.put('/:id', async (req,res) => {
        try {
            const postToUpdate = await Post.findById(req.params.id);
            const updatedPost = await Post.updateOne(
                {_id: req.params.id},
                {
                    $set : {
                        title: req.body.title ?? postToUpdate.title,
                        content: req.body.content ?? postToUpdate.content,
                        tags: req.body.tags ?? postToUpdate.tags,
                    }
                });
            res.json(updatedPost)
        } catch (error) {
            console.warn(error);
            res.json({message: error.message});
        }
    })

//DELETE



router.delete('/:id', async (req,res)=>{
    try {
        const deletePost = await Post.remove({_id: req.params.id});
        res.json(deletePost);
        
    } catch (error) {
        console.log(error);
        res.json({message:error.message});
    }


})

module.exports = router;