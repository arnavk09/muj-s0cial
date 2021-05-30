const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const userSchema=new mongoose.Schema({
name:{
    type : String,
    required: true
},
email:{
type : String,
required: true
},
password:{
    type : String,
    required : true
},
    pic: {
        type: String,
        default: "https://res.cloudinary.com/arnavk09/image/upload/v1622363264/Screenshot_2021-01-06_193618_rb5fpa.png"
    },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }]
})
mongoose.model("User", userSchema)