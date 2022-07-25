

// useState is the react hook which help in monitor the state or data dynamically in the client side
import { useState, useContext, useEffect} from "react";

// axios is the npm package used for get, post and push etc
import axios from "axios";

// to consolelog error as toast
import { toast } from "react-toastify";


// link tag to move from page to page
import Link from 'next/link'

// Input form containing email and password
import Form from '../components/forms/authform'

// To route to homepage when the user credentials are verified
import {useRouter} from 'next/router'

// import context when u need context
import { UserContext } from "../context";




const Login = () => {
  //state hooks
  
  const [email, setEmail] = useState("toxci@gmail");
  const [password, setPassword] = useState("dhoigh");
  const [loading, setLoading] = useState(false);


  const [state, setState] = useContext(UserContext)


  // used to route to different pages upon action
  const router = useRouter()

 



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      setLoading(true)
      // console.log(name, email, password, secret);
      //${process.env.NEXT_PUBLIC_API}/login changed coz for axios interceptors
      const { data } = await axios.post(
        `/login`, 
        {
        email,
        password,
      });

      if(data.error) {
        toast.error(data.error)
        setLoading(false)
      }
      else {
        setState({
          //update context
          user: data.user,
          token: data.token
  
  
          //next step, we need to save this in local storage
  
        });
  
       
  
  
        //saving jwt to localstorage
  
        window.localStorage.setItem('auth', JSON.stringify(data))
        //window  object
        // contain localstorage
        // gives function setItem()
        // arguments 1. => Key , 2 => value
        // save in local storage only using json format 
        // we have javascript object "data" we need to convert to json format
  
  
        //console.log(data); // logs token and other credentials
  
        //pushing the user to homepage or something
        router.push('/')
  
  
        //emptying once the data is entered, done for UI smoothing
  
      //   setEmail('')
      //   setPassword('')
      //   setLoading(false)

      }
      


    } 
    
    catch (err) 
    {
      console.log(err);
      setLoading(false);
    }
  };


  if(state && state.token ) router.push('/')

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


          <div className="row">
                <div className="col">
                      <p className="text-center">forgot password?  
                                  
                                  <Link href='/forgot-password'>
                                    <a>Reset password </a>
                                  </Link> </p>
                </div>
          </div>



    </div>
  );
};

export default Login;








