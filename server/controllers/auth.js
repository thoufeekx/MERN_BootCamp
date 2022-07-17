///***********************IMPORT statments */

import User from '../models/user'
//importing user model to verify
//and saving in database


import{  hashPassword, comparePassword } from '../helpers/auth'
// importing function to do 
//Validation
//comparison



import jwt from 'jsonwebtoken'
// jwt makes sure the authority of user
//proctect certain routes
//allow users to post, edit and stuff like that










export const register = async (req,res) => {
    //console.log('Register endpoint =>', req.body)
    //to make this work make express.json is applied in the above middleware

    //console.log error to debug code


    const {name, email, password, secret} = req.body;

    //validation
    if(!name) return res.status(400).send('Name is required')
    if(!password  || password.length < 6) return res.status(400).send('Password is short or password is not entered')
    if(!secret) return res.status(400).send('Answer is required')

    
    const exist = await User.findOne({email })


    if(exist) return res.status(400).send('Email is taken')


    //we want to hash the password so import hash function from helpers/auth
    const hashedPassword = await hashPassword(password)

    // create a new user****************************

    const user = new User({
        name, email, password : hashedPassword, secret
        // name: name , since its correct we dont do it
        // email : email , correct so we dont do it

    }) 
    
    try {
            await user.save()
            console.log("Registered New User", user)
            //use save because itss a new instance of user
            return res.json({ 
                                ok: true,
                            })
    }

    catch (err){
        console.log('Register failed => ', err)
        return res.status(400).send("Error, try again")

    }
} 

// login credential verification and other stuff

export const login = async (req, res) => {

    // step 1 make sure front data is received here
    //console.log(req.body)

    try 
    {

        // step 1 get user first or find user
        // step 2 compare the user password

        const { email, password} = req.body;
        //destructuring to obtain email and password from body


        //finding user with user model User = user Model
        const user = await User.findOne({email});

        if(!user) return res.status(400).send('No user found ')
        // send err msg if no user is found with the name


        //checking password is valid
        const match = await comparePassword(password, user.password)
        //user.password is password saved in database

        if(!match) return res.status(400).send('Wrong password, Try again')
        // if the password doesnt match err is send to front
        // error is found in network response mostly


        // step 3 

        //creating a signed jwt token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        //jwt.sign arguments 1. payload (user data)
                        //   2. secret in env is used to generate token 
                        // verification also require token
                        // 3. setting up expired date



        // make sure we dont change user password and secret
        user.password = undefined;
        user.secret = undefined



        //step 4 
        //we can send succesfull response in the front end
        //send as json response

        res.json({token, user})
        
        //client side token and user is visible
        // display logged in user informations



        
    } 
    
    catch (error) 
    {
        console.log(err)
        return res.status(400).send(`Error. Try again.`)
    }


}