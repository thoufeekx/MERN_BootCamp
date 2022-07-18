import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {Modal} from 'antd'
import Link from 'next/link'
//import {SyncOutlined} from '@ant-design/icons'
import Form from '../components/forms/authform'

import {UserContext} from '../context'
import { useRouter } from "next/router";

const Register = () => {
  //state hooks
  const [name, setName] = useState("tgyou");
  const [email, setEmail] = useState("toxci@gmail");
  const [password, setPassword] = useState("dhoigh");
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
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register`, 
        {
        name,
        email,
        password,
        secret,
      });


      //emptying once the data is entered  for UI smoothing
      setName('')
      setEmail('')
      setPassword('')
      setSecret('')

      setOk(data.ok);
      setLoading(false)
    } 
    
    catch (err) 
    {
      console.log(err.response.data)
      toast.error(err.response.data);
      setLoading(false)
    }
  };

  if(state && state.token ) router.push('/')

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light bg-default-image">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>

      {/* {loading ? <h1>Loading</h1> : ''} */}
      

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">


          {/* render from */}


          <Form  
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
                                  <p>You have succesfully registered.</p>
                                  <Link href='/login'>
                                    <a className="btn btn-primary btn-sm">Login </a>
                                  </Link>
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

export default Register;








