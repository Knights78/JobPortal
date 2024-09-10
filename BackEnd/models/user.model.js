import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    phoneNumber:{
        type:Number,
    },
    password:{
        type:String,
    
    },
    role:{
        type:String,
        enum:['student','recruiter'],
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},//we will store url of that particular link
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},//here for whichever company user is applying in this particular company id will be stored
        profilePhoto:{
            type:String,
            default:" "
        }
    },
    provider: {
        type: String,
        default: 'local', // Default 'local' for email-password; 'google' for OAuth
      },
      googleId: {
        type: String,
        unique: true,
        required: false,  // This can be false if not all users will use Google
      },

},{timestamps:true});

export const User=mongoose.model('User',userSchema);