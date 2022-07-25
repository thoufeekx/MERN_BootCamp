import { useState, createContext, useEffect } from "react";

//import axios for log out thingy when jwt token expires
import axios from 'axios'
import {useRouter} from 'next/router'
 



const UserContext = createContext();


//.provider and pass the functions


//this is the component
const UserProvider = ({children}) => {

    // children prop is available to all components wrapped in UserProvider

    const [state, setState] = useState({
        user: {},
        token: '',
    });

    //updating token within localstorage
    useEffect( () => {

        // JSON ==>> javascript object is done by using JSON.parse()

        
        setState(JSON.parse(window.localStorage.getItem('auth')));


        //we get data from local storage and populated the state
      }, [])



    //when user succesfully login user will update state in context


    const router = useRouter()

    //axios configeration for reducing the code check with jwt token

      const token = state && state.token ? state.token : "";
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
      // whatever in env file will be set as default
      //process.env.NEXT_PUBLIC_API : localhost:8000/api
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //including bearer token in headers




    axios.interceptors.response.use(
        function(response) {
            //Do something before req is sent
            return response
        },

        function (error) {
            // do something with req error

            let res = error.response;
            if(res.status === 401 && res.config && !res.config.__isRetryRequest) {
                setState(null);
                window.localStorage.removeItem('auth')
                router.push('/login')
            }
            
        }
    ) 





    return (
        <UserContext.Provider value={  [state, setState] }>
            {children}
        </UserContext.Provider>
    )


}

export {UserContext, UserProvider}