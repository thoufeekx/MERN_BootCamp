import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

//import routes/auth for routing
//filessystem from core nodejs
import {readdirSync} from 'fs';


const morgan = require('morgan')
require('dotenv').config();


const app = express();


//db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
        .then(() => console.log('Database connection Success 200'))
        .catch((err) => console.log(err))





    //applying middlwares
    // we use "use" command when using middlewares

    app.use(express.json({limit: "5mb"}));

    // express.json() => this alone return undefined error , use json({})

    app.use(express.urlencoded({extended: true}))
    //help us send front end dataload

    app.use(cors({
        origin: ['http://localhost:3000']
    }))


    //autoload routes, readdirSync is an
    readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

    //usually apply middleware like this =>>>>>>> app.use('/api', require(`./routes/${r}`)),  prefix route and then import route and apply here
    //now we are doing this in map function 
    //each file is mapped and applied as a middleware


  

    const port = process.env.PORT || 8000
    app.listen(port, () => console.log(`connected to port ${port}`))



