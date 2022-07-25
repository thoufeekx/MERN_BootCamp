import Post from "../models/post";

export const createPost = async (req,res) => {
   // console.log('Post => ',req.body) // output is in backend terminal
   //make sure post is received in the backend using routing
   //make sure endpoint '/create-post' same in client 'pages/user/dashboard/postSubmit' and backend 'server/route/post.js

   //saving req.body to a const
   const {content} = req.body

   //validation if no data on req.body we send error message
   if(!content.length) return res.json( 
    {error: 'Require content'}
                    )

   //now try catch block to save the data to database
   try 
   {
        //creating a post
        const post = new Post({
            content,
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
     console.log('Image data from front end =>', req.files)
}