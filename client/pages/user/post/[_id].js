import { useEffect, useState } from "react";

import PostForm from "../../../components/forms/PostForm";

import UserRoute from "../../../components/routes/userroute";

import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';

const EditPost = () => {

    const [post, setPost] = useState({})
    //state
    const [content, setContent] = useState('')
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)

    const router = useRouter()
    //console.log('router', router);

    const _id = router.query._id;

    useEffect( () => {
            if(_id)  fetchPost();
    }, [_id])


    const fetchPost = async () => {

        try 
        {
            const {data} = await axios.get(`/user-post/${_id}`);
            setPost(data)
            setContent(data.content)
            setImage(data.image)

        } 
        catch (error) 
        {
            console.log(error);
        } 
    }


    const postSubmit = async (e) => {
        e.preventDefault();


        //console.log('Submit post to update', content, image);

        try 
        {
            const {data} = await axios.put(`/update-post/${_id}`, {content, image});
            if(data.error) {
                toast.error(data.error)
            }

            else {
                toast.success('Post updated');
                router.push('/user/dashboard');
            }
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    //creating a handleImage function to handle image
     // includes send it server as formdata, upload to cloudinary

     const handleImage = async (e) => {
        const file = e.target.files[0];
        //we need form data to send files
        let formData = new FormData();
  
        //browser function
        formData.append('image', file);
        console.log([...formData]);
  
        setUploading(true)
        try 
        {
            const {data} = await axios.post('/image-upload', formData)
          //console.log('upload img =>', data);
  
            setImage({
              url: data.url,
              public_id: data.public_id
            })
  
          setUploading(false)
        } 
        catch (error) 
        {
          console.log(error);
          setUploading(false)
        }
  
  
  
       }

    return (
       
      <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 bg-secondary text-light bg-default-image">
          <div className="col text-center">
            <h1>News Feed</h1>
          </div>
        </div>
         
        <div className="row py-3">
              <div className="col-md-8 offset-md-2">
                  <PostForm 
                      content={content} 
                      setContent={setContent} 
                      postSubmit={postSubmit}
                      handleImage={handleImage}
                      uploading={uploading}
                      image={image}
                      />
                  <br/>
               
                      
              </div>

              
              
          
        </div>
      </div>
    </UserRoute>
        // create a endpoint at backend so we can make req to get post by id
    )
}

export default EditPost;