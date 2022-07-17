import bcrypt from 'bcrypt'

export const hashPassword = (password) => {


    

    return new Promise((resolve, reject) => {


        bcrypt.genSalt(12, (err, salt) => {
            // 12 hash length, err or salt 
            if(err) reject(err)

            //==before we hash the password we need to genetate salt that what above code do


            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject(err)

                resolve(hash)
            })
        })

    })

};



// this function is to verify the password 

export const comparePassword = (password, hashed) => {

    return bcrypt.compare(password, hashed);
    //if password match return true
    //password coming from ******************************** client side 
    // hashed password coming from ************************ database


}

