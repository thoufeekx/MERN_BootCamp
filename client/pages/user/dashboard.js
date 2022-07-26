import {UserContext} from '../../context'
import { useContext, useState, useEffect } from 'react';

import UserRoute from '../../components/routes/userroute';

import PostForm from '../../components/forms/PostForm'

//pass UserContext to useContext
import { useRouter } from 'next/router';

import axios from 'axios';
import { toast } from 'react-toastify';

import PostList from '../../components/cards/PostList';





const home = () => {

    const [state, setState] = useContext(UserContext);
    // state
     const [content, setContent] = useState('');

     //creating state for image
     const [image, setImage] = useState({})

     //state for keeping track upload time
     const [uploading, setUploading] = useState(false) 

     //posts
     const [posts, setPosts] = useState([])
     
     useEffect( () => {
      if(state && state.token) fetchUserPosts();

     }, [state && state.token])

     //route
     const router = useRouter();


     const fetchUserPosts = async () => {
      //fetch user posts from database
      try 
      {
        const {data} = await axios.get('/user-posts')
        //console.log('user posts =>', data)
        setPosts(data)
      } 
      catch (error) 
      {
        console.log(error);
      }
     }

     //when form is submitted we need to do something
     //sent content to backend to save it in the database

     const postSubmit = async (e) => {
        e.preventDefault();
        //console.log('Post =>', content);

        try 
        {
            const {data} = await axios.post('/create-post', {content, image})
            console.log('Post data to backend', data);

            if(data.error) {
                toast(data.error)
            }

            else {

                fetchUserPosts();
                toast.success('Post created')
                setContent('')
                setImage({})
                //setOk(data.ok);
                //setLoading(false)
            }
        } 
        
        catch (err) 
        {
            console.log(err);
            //setLoading(false);
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

    const handleDelete = async (post) => {
        try 
        {
          const answer = window.confirm('Delet post?')
          if(!answer) return;

         const {data} = await axios.delete(`/delete-post/${post._id}`)
         toast.error('Post deleted')
         fetchUserPosts();
        }
         catch (error) 
         {
          console.log(error);
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
                <div className="col-md-8">
                    <PostForm 
                        content={content} 
                        setContent={setContent} 
                        postSubmit={postSubmit}
                        handleImage={handleImage}
                        uploading={uploading}
                        image={image}
                        />
                    <br/>
                  <PostList posts={posts} handleDelete={handleDelete}/>

                        
                </div>

                
                {/* <pre> {JSON.stringify(posts, null,4)}</pre> */}
                <div className="col-md-4">Side Bar</div>
            
          </div>
        </div>
      </UserRoute>
    );
}

export default home;