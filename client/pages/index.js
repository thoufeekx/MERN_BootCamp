import {UserContext} from '../context'
import { useContext } from 'react';

//pass UserContext to useContext



const home = () => {

    const [state, setState] = useContext(UserContext);


    return (
        <div className="container">
            <div className="row">
                    <h1 className="display-1 text-center py-5">
                        Home Page
                    </h1>

                    {JSON.stringify(state)}

                    <img src='/images/default.jpg' alt='image' />
            </div>

        </div>
    )
}

export default home;