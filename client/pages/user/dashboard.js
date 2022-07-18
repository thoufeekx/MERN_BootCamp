import {UserContext} from '../../context'
import { useContext } from 'react';

import UserRoute from '../../components/routes/userroute';

//pass UserContext to useContext



const home = () => {

    const [state, setState] = useContext(UserContext);


    return (

        <UserRoute>
        <div className="container">
            <div className="row">
                    <h1 className="display-1 text-center py-5">
                        Dash board
                    </h1>

                    

                    
            </div>

        </div>
        </UserRoute>
    )
}

export default home;