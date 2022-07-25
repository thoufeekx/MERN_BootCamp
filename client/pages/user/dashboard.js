import {UserContext} from '../../context'
import { useContext, useState } from 'react';

import UserRoute from '../../components/routes/userroute';

import CreatePostForm from '../../components/forms/createPostForm'

//pass UserContext to useContext
import { useRouter } from 'next/router';

import axios from 'axios';
import { toast } from 'react-toastify';





const home = () => {

    const [state, setState] = useContext(UserContext);
    // state
     const [content, setContent] = useState('');
     //route
     const router = useRouter();

     //when form is submitted we need to do something
     //sent content to backend to save it in the database

     const postSubmit = async (e) => {
        e.preventDefault();
        //console.log('Post =>', content);

        try 
        {
            const {data} = await axios.post('/create-post', {content})
            console.log('Post data to backend', data);

            if(data.error) {
                toast(data.error)
            }

            else {
                toast.success('Post created')
                setContent('')
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


      try 
      {
          const {data} = await axios.post('/image-upload', formData)
        
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
                    <CreatePostForm 
                        content={content} 
                        setContent={setContent} 
                        postSubmit={postSubmit}
                        handleImage={handleImage}
                        />
                </div>
                <div className="col-md-4">Side Bar</div>
            
          </div>
        </div>
      </UserRoute>
    );
}

export default home;