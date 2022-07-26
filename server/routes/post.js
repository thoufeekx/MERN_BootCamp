import express from 'express';
import formidable from 'express-formidable'


const router = express.Router();



//import controllers
import {createPost ,uploadImage, postsByUser, userPost, updatePost, deletePost} from '../controllers/post'

import {requireSignin, canEditDeletePost} from '../middlewares'



//All the function is defined in controllers
router.post('/create-post', requireSignin, createPost)
//require sign in to create a post
//createPost function explain grabs data from front end saves it in the backend
//createPost is defined in '../controller/post'

//creating a route for uploading-image
router.post('/image-upload', requireSignin,
                            formidable({maxFileSize : 5 * 1024 * 1024}),
                            uploadImage
                        );
      //upload image is function defined to create backend stuff such as receive data from front end and save in DB


      //function to get posts by user to display in dashboard
      router.get('/user-posts', requireSignin, postsByUser)
      //postsByUser is defined in server/controllers/post.js


      //routes to edit the available posts by user
      router.get('/user-post/:_id', requireSignin,userPost )


      //routess to update the content
      router.put('/update-post/:_id', requireSignin,canEditDeletePost, updatePost)

      //route to delete the post
      router.delete('/delete-post/:_id', requireSignin,canEditDeletePost, deletePost)







module.exports = router