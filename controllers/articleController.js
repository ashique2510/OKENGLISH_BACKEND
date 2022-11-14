const { findByIdAndUpdate } = require('../models/articleModel');
const Article = require('../models/articleModel')

// Create

const createArticle = async (req,res)=>{

           const newArticle = new Article(req.body)

           try{ 
                  const savedArticle = await newArticle.save();
                  res.status(200).json(savedArticle);

           } catch(err){
            res.status(500).json(err)

           }

}

// Update

const updateArticle = async (req,res)=>{

             try{
                const article = await Article.findById(req.params.id);
                if(article.username === req.body.username){
                    try{
                        const updateArticle = await Article.findByIdAndUpdate(req.params.id,{
                            $set:req.body,
                        },
                        {new:true}
                        );
                        res.status(200).json(updateArticle)

                    }catch(err){
                      res.status(500).json(err)
                    }

                }else{
                    res.status(401).json("You can update only your article")

                }

             }catch(err){
                res.status(500).json(err)
             }
            
}

// Delete

const deleteArticle = async (req,res)=>{


       const article = await Article.findById(req.params.id);

           try{
               await article.delete()
               res.status(200).json('Post has been deleted')


           }catch(err){
             res.status(500).json(err)
           }

       }

   

// Get Article

const getArticle = async(req,res)=>{
    try{
        const article = await Article.findById(req.params.id);
        res.status(200).json(article)

    }catch(err){
        res.status(500).json(err)

    }
}

// Get All Article

const getAllArticle = async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    console.log('from back end',req.query);
   try{

    let articles;
    if(username){
        articles = await Article.find({username:username});

    }else if(catName){
        
        articles = await Article.find({category:catName});

    }else{
        articles = await Article.find()

    }
    res.status(200).json(articles)
        

   }catch(err){
    
    res.status(500).json(err)

   }
}

// Add Likes

const addLikes = async(req,res) => {

    console.log('from backe eeend',req.body);


    try{
        const addLikes = await Article.findByIdAndUpdate(req.params.id,
            { $push: { likes: req.body } },
        {new:true}
        );
        res.status(200).json(addLikes)

    }catch(err){
      res.status(500).json(err)
    }
    console.log('finsh');
}

// Remove Like 

const removeLike = async(req,res) => {

    console.log('req.body',req.body);
    console.log('req.params',req.params);


    try{  


        const checkUsername = await Article.findOne({ _id:req.params.id,
            likes: { 
               $elemMatch: { username: req.body.username } 
            }
         }, function (err, user) {

            if (err){
                return done(err);
            }    
    
            if (user) {
                console.log("user FOUND");

                const removeLikes = async() => {

                   const removeLike = await Article.findByIdAndUpdate(req.params.id, 
                    { "$pull": { "likes": { "username": req.body.username } }}
                    
                    );
                    res.status(200).json('USER FOUND')
                    console.log('removing finished');
                  }
                  removeLikes()
    
            } else {
                console.log("user NOT FOUND");
                res.json('USER NOT FOUND')
    
            }

    
        }); 
         


    }catch(err){
       
        // res.status(500).json(err)
        console.log('removing failed',err);

    }

}



module.exports={
    createArticle,
    updateArticle,
    deleteArticle,
    getArticle,
    getAllArticle,
    addLikes,
    removeLike
    
}