import express from 'express'


const router = express.Router();


//import controllers
import {register, login, currentUser, forgotPassword} from '../controllers/auth'

import {requireSignin} from '../middlewares'



//All the function is defined in controllers


router.post('/register', register)
//the controller register in imported from controllers file
//register contain all the code for validation 
// hashing and provide network response


router.post('/login', login)
//log in might contain the camparing hashed passwords 
// and log in credentials


router.get('/current-user',requireSignin, currentUser)
//verify token first only then access is provided
//requiresignin function verify the validity of token
//currentUSer is a function that handles the stuff


router.post('/forgot-password',forgotPassword)
//verify the secret secret entered durign registration
//if pass. alowed to create a newpassword
//forgotPassword is a function that do backend stuff of changing the old password and also deleting it




module.exports = router