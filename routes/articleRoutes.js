const express = require('express')
const router = express.Router()
const { createArticle , updateArticle ,deleteArticle , getArticle , getAllArticle ,addLikes , removeLike} =require('../controllers/articleController')
const { protect } = require('../middleware/authMiddleware')

router.post('/create',createArticle)
router.put('/update/:id',updateArticle)
router.delete('/delete/:id/',protect, deleteArticle)
router.get('/getArticle/:id',getArticle)
router.get('/getAllArticle',getAllArticle)
router.post('/addLike/:id',addLikes)
router.post('/removeLike/:id',removeLike)





module.exports=router