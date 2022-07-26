import Post from "../models/post";

import cloudinary from 'cloudinary'

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME,
     api_key: process.env.CLOUDINARY_KEY,
     api_secret: process.env.CLOUDINARY_SECRET
})

export const createPost = async (req,res) => {
   // console.log('Post => ',req.body) // output is in backend terminal
   //make sure post is received in the backend using routing
   //make sure endpoint '/create-post' same in client 'pages/user/dashboard/postSubmit' and backend 'server/route/post.js

   //saving req.body to a const
   const {content, image} = req.body

   //validation if no data on req.body we send error message
   if(!content.length) return res.json( 
    {error: 'Require content'}
                    )

   //now try catch block to save the data to database
   try 
   {
        //creating a post
        const post = new Post({
            content, image,
            postedBy: req.user._id //require the middleware 'requireSignIn'
        });

        post.save();
        res.json(post);
   } 
   catch (error) 
   {
        console.log(error);
        res.sendStatus(400);
   }
}


export const uploadImage = async (req, res) => {
     //console.log('Image data from front end =>', req.files)

     try 
     {
          const result = await cloudinary.uploader.upload(req.files.image.path)
     //this give url when upload is successful

     //console.log('upload img url =>', result);

     //send this to client as json
     res.json({
          url: result.secure_url,
          public_id : result.public_id
     })
     } 
     catch (error) 
     {
         console.log(error); 
     }
}

export const postsByUser = async (req, res) => {
     try 
     {
          //const posts = await Post.find({postedBy: req.user._id})
          const posts = await Post.find()
               .populate('postedBy', '_id name image')
               .sort({createdAt: -1})
               .limit(10)
               
     
               //console.log('user posts =>', posts);
               res.json(posts)

     
     } 
     catch (error) 
     {
          console.log(error);
     }
          
}

export const userPost = async (req, res) => {
     try 
     {
          const post = await Post.findById(req.params._id)
          res.json(post)
     } 
     catch (error) 
     {
         console.log(error); 
     }
}


export const updatePost = async (req, res) => {
    
    
     try 
     {
         //console.log('Post update controller', req.body);
         const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
          new: true,
         })

         res.json(post)
     } 
     
     catch (error) 
     {
          console.log(error);
     }
}

export const deletePost = async (req,res) => {
     try 
     {
          const post = await Post.findByIdAndDelete(req.params._id);
          //remove img from cloudinary
          if(post.image && post.image.public_id) {
               const image = await cloudinary.uploader.destroy(post.image.public_id)
          }

          res.json({ok: true})
     } 
     
     catch (error) 
     {
          console.log(error);
     }
}