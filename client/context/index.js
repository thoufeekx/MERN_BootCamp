import { useState, createContext, useEffect } from "react";




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


    return (
        <UserContext.Provider value={  [state, setState] }>
            {children}
        </UserContext.Provider>
    )


}

export {UserContext, UserProvider}