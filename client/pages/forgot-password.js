import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {Modal} from 'antd'
import Link from 'next/link'
//import {SyncOutlined} from '@ant-design/icons'
import ForgotPasswordForm from '../components/forms/forgotpasswordform'

import {UserContext} from '../context'
import { useRouter } from "next/router";

const ForgotPassword = () => {
  //state hooks
  
  const [email, setEmail] = useState("toxci@gmail");
  const [newpassword, setNewPassword] = useState("dhoigh");
  const [secret, setSecret] = useState("jkdjkfkd");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false)

  const [state] = useContext(UserContext)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      setLoading(true)
      // console.log(name, email, password, secret);
      //${process.env.NEXT_PUBLIC_API}/register , chnaged coz for axios interceptor 'axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;'
      const { data } = await axios.post(
        `/forgot-password`, 
        {
        
        email,
        newpassword,
        secret,
      });

        console.log('data =>', data);
      //emptying once the data is entered  for UI smoothing
      // setName('')
      // setEmail('')
      // setPassword('')
      // setSecret('')

      // setOk(data.ok);
      // setLoading(false)


      // catch (err) 
    // {
    //   console.log(err.response.data)
    //   toast.error(err.response.data);
    //   setLoading(false)
    // }
      
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
  
      if (data.success) {
        setEmail("");
        setNewPassword("");
        setSecret("");
        setOk(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
 
    
    
  };

  if(state && state.token ) router.push('/')

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light bg-default-image">
        <div className="col text-center">
          <h1>ForgotPassword</h1>
        </div>
      </div>

      {/* {loading ? <h1>Loading</h1> : ''} */}
      

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">


          {/* render from */}


          <ForgotPasswordForm
              handleSubmit={handleSubmit}
              
              email={email}
              setEmail={setEmail}
              newpassword={newpassword}
              setNewPassword={setNewPassword}
              secret={secret}
              setSecret={setSecret}
              loading={loading}
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
                                  <p>You can now login with new password.</p>
                                  <Link href='/login'>
                                    <a className="btn btn-primary btn-sm">Login </a>
                                  </Link>
                      </Modal>
                </div>

          </div>

{/* 
          <div className="row">
                <div className="col">
                      <p className="text-center">Already registerd?  
                                  
                                  <Link href='/login'>
                                    <a>Login </a>
                                  </Link> </p>
                </div>
          </div> */}



    </div>
  );
};

export default ForgotPassword;








