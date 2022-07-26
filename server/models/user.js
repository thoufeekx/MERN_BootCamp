import mongoose from 'mongoose'



//const schema can destructured
const {Schema} = mongoose;



const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true,
          },


    email: {
        type: String,
        trim: true,
        require: true,
        unique: true,
    },


    password:{
        type:  String,
        require: true,
        min: 6,
        max: 64,
    },



    secret:{
        type:  String,
        lowercase: true,
        require: true,
    },


    username:{
        type:  String,
        unique: true,
        require: true,
    },

    about: {},

    photo: String,

        following: [{
                    type: Schema.ObjectId,
                    ref: 'User',

                    }],


        followers:  [{
                        type: Schema.ObjectId,
                        ref: 'User',
                        //This user refers to user model
                        //each details is found out using objectid
                    }],


},

{timestamps: true}
//time stamp is passed as second argument
);





export default mongoose.model('User', userSchema);
            //model is User based on userSchema
