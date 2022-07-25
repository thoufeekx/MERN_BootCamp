
import mongoose  from "mongoose";

const {ObjectId} = mongoose.Schema

const postSchema = new mongoose.Schema ({

    content: {
        type: String,
        required: true,
    },

    postedBy: {
        type: ObjectId,
        ref: 'User', //refer the user model
       },

    image: {
        url: String,
        piblic_id: String,
    },

    likes:[{
        type: ObjectId,
        ref: 'User',
    }],

    comments: [{
        text: String,
        created: {
            type: Date, default: Date.now,
        },
        postedBy: {
            type: ObjectId,
            ref: 'User'
        },
    }]

},

{
    timestamps: true
}
)

export default mongoose.model('Post', postSchema)