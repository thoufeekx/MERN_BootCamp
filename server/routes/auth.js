import express from 'express'


const router = express.Router();


//import controllers
import {register, login, currentUser} from '../controllers/auth'

import {requireSignin} from '../middlewares'






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


module.exports = router