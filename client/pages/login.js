import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
//import {Modal} from 'antd'
import Link from 'next/link'
//import {SyncOutlined} from '@ant-design/icons'
import Form from '../components/forms/authform'
import {useRouter} from 'next/router'

const Login = () => {
  //state hooks
  
  const [email, setEmail] = useState("toxci@gmail");
  const [password, setPassword] = useState("dhoigh");
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      setLoading(true)
      // console.log(name, email, password, secret);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/login`, 
        {
        email,
        password,
      });


      //console.log(data); // logs token and other credentials
      //router.push('/')


      //emptying once the data is entered  for UI smoothing

    //   setEmail('')
    //   setPassword('')
    //   setLoading(false)


    } 
    
    catch (err) 
    {
      console.log(err.response.data)
      toast.error(err.response.data);
      setLoading(false)
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light bg-default-image">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>

      {/* {loading ? <h1>Loading</h1> : ''} */}
      

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">


          {/* render from */}


          <Form  
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              page='login'
          />






        </div>
      </div>

        


          <div className="row">
                <div className="col">
                      <p className="text-center">Not yet registerd?  
                                  
                                  <Link href='/register'>
                                    <a>Register </a>
                                  </Link> </p>
                </div>
          </div>



    </div>
  );
};

export default Login;








