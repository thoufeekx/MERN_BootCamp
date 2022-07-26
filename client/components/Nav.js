import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../context';

import {useRouter} from 'next/router'



//import navigation component Link from "next/link" 
//destructure is done in react but not in next
//'to' is not used in next.js instead href='/'
import Link from 'next/link'




const Nav = () => {

    const [current, setCurrent] = useState('')


    const [state, setState] = useContext(UserContext)

    useEffect( () => {
          process.browser && setCurrent(window.location.pathname)
    }, [process.browser && window.location.pathname])

    //console.log('current =>', current);

    const router = useRouter()




    const logout = () => {

      window.localStorage.removeItem('auth');
      setState(null);
      router.push('/login')
    }


  return (
    <nav
      className="nav d-flex justify-content-end "
      style={{ backgroundColor: "blue" }}
    >
      <Link href="/">
        <a
          className={`nav-link text-light logo ${current === "/" && "active"}`}
        >
          Mern Camp
        </a>
      </Link>

      {/* {state !== null ? 'got user' : 'state null'} 
       conditional
       // if the state is null display login and register
       // if there is value in state display logout
      */}

        
      {state !== null ? (
        <>
        <div className="dropdown">
          <a
            className="btn dropdown-toggle text-light"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {state && state.user && state.user.name}
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <Link href="/user/dashboard">
                <a
                  className={`nav-link dropdown-item ${
                    current === "/user/dashboard" && "active"
                  }`}
                >
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <a onClick={logout} className="nav-link">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </>
      ) : (
        <>
          <Link href="/login">
            <a
              className={`nav-link text-light ${
                current === "/login" && "active"
              }`}
            >
              login
            </a>
          </Link>

          <Link href="/register">
            <a
              className={`nav-link text-light ${
                current === "/register" && "active"
              }`}
            >
              Register
            </a>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
