import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {Modal} from 'antd'
import Link from 'next/link'
//import {SyncOutlined} from '@ant-design/icons'
import AuthForm from "../../../components/forms/authform";

import { UserContext } from "../../../context";


import { useRouter } from "next/router";

import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar } from "antd";



const UpdateProfile = () => {
        //new state hooks for username and about

        const [username, setUsername] = useState('');
        const [about, setAbout] = useState('');


        //new hook for profile image
        const [image, setImage] = useState({});
        const [uploading, setUploading] = useState(false);


  //state hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false)

  const [state, setState] = useContext(UserContext)
  const router = useRouter()

  //lets try to get information from state to show it in profile page
  useEffect(() => {
    if(state && state.user)

  //console.log(state.user);
  setUsername(state.user.username)
  setEmail(state.user.email)
  setName(state.user.name)
  setAbout(state.user.about)
  setImage(state.user.image)
    
  }, [state && state.user])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      setLoading(true)
      //console.log(name, email, password, secret, about, username);
      //${process.env.NEXT_PUBLIC_API}/register , chnaged coz for axios interceptor 'axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;'
      const { data } = await axios.put(
        `/profile-update`, 
        {
        name,
        email,
        password,
        secret,
        username,
        about,
        image,
      });

      if(data.error) 
      {
        toast.error(data.error)
        setLoading(false)
      } 
      else 
      {
        //emptying once the data is entered  for UI smoothing
    //   setName('')
    //   setEmail('')
    //   setPassword('')
    //   setSecret('')



    //update localstorage, update user, keep token
    //update context , make sure setState available

     let auth = JSON.parse(localStorage.getItem('auth')) // .parse  is used to get item from localstorage

     auth.user = data // set to new info

     //saving new info to database

     localStorage.setItem('auth', JSON.stringify(auth)) //.stringify is used to save it in database


     setState({...state, user: data}); //avoid the info with spread and update only user data

      setOk(true);
      setLoading(false)
      }

      
    } 
    
    catch (err) 
    {
      console.log(err);
      setLoading(false);
    }
  };


  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    //console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      console.log("uploaded image => ", data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };
  //if(state && state.token ) router.push('/') in profile update page we dont need to push

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light bg-default-image">
        <div className="col text-center">
          <h1>UpdateProfile</h1>
        </div>
      </div>

      {/* {loading ? <h1>Loading</h1> : ''} */}
      

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">


          {/* render from */}

          <label className="d-flex justify-content-center h1">
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1" />
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <CameraOutlined className="mt-2" />
          )}
          <input onChange={handleImage} type="file" accept="images/*" hidden />
        </label>


          <AuthForm  

                username = {username}
                setUsername={setUsername}
                about = {about}
                setAbout= {setAbout}
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              secret={secret}
              setSecret={setSecret}
              loading={loading}
                profileUpdate={true}
          />






        </div>
      </div>

        <div className="row">
                <div className="col">
                      <Modal 
                              title='Congratulations'
                              visible={ok}
                              onCancel={ () => setOk(false)}
                              footer={null}
                              >
                                  <p>You have succesfully updated.</p>
                                  
                      </Modal>
                </div>

          </div>


          <div className="row">
                <div className="col">
                      <p className="text-center">Already registerd?  
                                  
                                  <Link href='/login'>
                                    <a>Login </a>
                                  </Link> </p>
                </div>
          </div>



    </div>
  );
};

export default UpdateProfile;








