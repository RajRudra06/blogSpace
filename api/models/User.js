import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const userSchema=new Schema(
    {
       username:{type:String,required:true,min:4,unique:false},
       password:{type:String,required:true,min:4,unique:false},
       lastName:{type:String,required:true,min:4,unique:false},
       firstName:{type:String,required:true,min:4,unique:false},
       email:{type:String,required:true,min:4,unique:false}

    }
)

const userModel=model('User',userSchema);
export default userModel