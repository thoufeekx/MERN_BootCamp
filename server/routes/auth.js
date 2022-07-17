import express from 'express'


const router = express.Router();


//import controllers
import {register, login} from '../controllers/auth'






router.post('/register', register)
//the controller register in imported from controllers file
//register contain all the code for validation 
// hashing and provide network response


router.post('/login', login)
//log in might contain the camparing hashed passwords 
// and log in credentials

module.exports = router