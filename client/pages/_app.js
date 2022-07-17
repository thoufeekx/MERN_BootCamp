import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../components/Nav';

import Head from 'next/head'

import {ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

import 'antd/dist/antd.css'


function MyApp ({ Component, pageProps})
    {
        return (
          <>

            <Head>
                <link rel='stylesheet' href='/css/style.css'/>
            </Head>

           



            <Nav />


            <ToastContainer position="top-center"/>
         
            <Component {...pageProps} />

                {/* 
                <></> =>> This is called react fragments
                , used when multiple components are rendered 
                jsx structure
                */}
          </>
        );
    }

    export default MyApp;
