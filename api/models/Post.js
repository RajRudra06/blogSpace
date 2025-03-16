import mongoose from "mongoose";
const {Schema,model} = mongoose;

const postSchema=new Schema(
    // defines the str of the doc
    {
        title:String,
        summary:String,
        content:String,
        author:String,
        cover:String,
       
    },
    // additional details of a given entry 
    {
        timestamps:true
    }
)

const postModel=model('Post',postSchema);
export default postModel;