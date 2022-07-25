import express from 'express';
import formidable from 'express-formidable'


const router = express.Router();



//import controllers
import {createPost ,uploadImage} from '../controllers/post'

import {requireSignin} from '../middlewares'



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







module.exports = router