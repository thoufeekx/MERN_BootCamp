//import navigation component Link from "next/link" 
//destructure is done in react but not in next
//'to' is not used in next.js instead
import Link from 'next/link'



const Nav = () => {
  return (
    <nav className="nav d-flex justify-content-end " 
         style={{backgroundColor: 'blue'}}>
      
            <Link href="/">
          <a className='nav-link text-light logo'>Mern Camp</a>
        </Link>
      

      
            <Link href="/login">
          <a className='nav-link text-light'>login</a>
        </Link>
      

      
            <Link href="/register">
          <a className='nav-link text-light'>Register</a>
        </Link>
      
      
     
      
    </nav>
  );
};

export default Nav;
