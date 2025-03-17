import userModel from './models/User.js';
import postModel from './models/Post.js';
import express, { json } from 'express';
const app=express();
import cors from 'cors';
import { default as mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import jwt from 'jsonwebtoken'; 
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
const uploadMiddleware=multer({dest:'uploads/'})

const saltKey=bcrypt.genSaltSync(10);
const jwtSecret='jhasbvdjhfbjhsbdkfnksad872y3rkjl'

app.use(cors({credentials:true, origin:'http://localhost:5173',methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],allowedHeaders:['Content-Type','Authorization']}));
app.use(json());
// makes the cookie available in req.cookies.token which will be send by the POST/GET request
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


async function connectDB() {
    try {
      await mongoose.connect('mongodb+srv://upasana36897:ZHmt0bctgEw1lP72@blogspacecluster0.9dpdg.mongodb.net/?retryWrites=true&w=majority&appName=blogSpaceCluster0');
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
  
connectDB();
  
app.post("/register",async(req,res)=>{
    const {username,password,lastName,firstName,email}=req.body
    try {
        const existingUser=await userModel.findOne({username})
        console.log(existingUser)
        if(existingUser){
          return res.status(400).json({
            msg:"User already exists"
          })
        }
        console.log("REnder Regostrtaion:: ")
        const userDoc=await userModel.create({
        username,
        password:bcrypt.hashSync(password,saltKey),
        lastName:lastName,
        firstName:firstName,
        email:email

        })
        res.json({
          msg:"Registered Succesfully"
        })
      
    } catch (error) {
      res.status(400).json(error)
      console.log(error)
    }
    
})

app.post("/login",async(req,res)=>{
  const {username,password}=req.body
  try {
      const existingUser=await userModel.findOne({username})
      console.log(existingUser)
      const passOK=bcrypt.compareSync(password, existingUser.password);
      console.log(bcrypt.compareSync(password, existingUser.password))
      console.log(existingUser)
      if(existingUser!=null){
        if(passOK){
          jwt.sign({username,id:existingUser._id},jwtSecret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token', token,{
              httpOnly:true,
              sameSite:'lax',
              maxAge:30*24*60*60*1000
            }).json({
              id:existingUser._id,
              username,
            })
          })

      }
      else{
        return res.status(400).json({
          msg:"Credentials does not match. confirm your password"
        })
      }}
      else if(existingUser==null){ 
        return res.status(400).json({
          msg:"User does not eixst. Register and then try logging in"
        })
      }
     
  } catch (error) {
    res.status(400).json(error)
  }
  
})

// app.get('/profile',(req,res)=>{
//   const {token}=req.cookies;
//   jwt.verify(token, jwtSecret, {}, (err,info)=>{
//     if(err) throw err;
//     res.json(info);
//   })
//   // res.json(req.cookies)
//   console.log(req.cookies)
// })

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    try {
      // Get the latest user data from database
      const user = await userModel.findById(info.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Return consistent property names
      res.json({
        id: user._id, // Use 'id' here to match frontend expectation
        username: user.username
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

app.get('/posts',async (req,res)=>{
  const posts=await postModel.find().sort({createdAt:-1}).limit(20 );
  res.json(posts);
})

app.post('/logout',(req,res)=>{
  res.cookie('token', '',{
    httpOnly:true,
    sameSite:'lax',
    expires: new Date(0)
  }).json('ok')
})

app.post('/createpost',uploadMiddleware.single('file'),async (req,res)=>{
  const {originalname,path}=req.file
  const parts =originalname.split('.')
  // extracting the extension of the original file thru splitting 
  const ext=parts[parts.length-1];
  const newPath=path+'.'+ext;
  fs.renameSync(path, newPath);
  const {title,summary,content,author}=req.body;
  const postDoc=await postModel.create({
    title:title,
    summary:summary,
    content:content,
    cover:newPath,
    author:author
  })

  res.json({
    msg:"Post created succesfully",
    value:postDoc
  })

  console.log(req.body);
})

app.get('/post/:id',async (req,res)=>{
  const {id}=req.params;
  console.log(id);
  const postDoc=await postModel.findById(id);
  res.json(postDoc);

})

app.get('/authorpost/:author',async(req,res)=>{
  const {author}=req.params;
  console.log(author);

  try
  {
    const authorAllPost=await postModel.find({author:author})
    console.log(authorAllPost);
    res.json(authorAllPost);
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      error:"Failed to fetch posts"
    })
  }
  

})

app.put("/updatepost", uploadMiddleware.single('file'), async(req,res)=>{
  res.json({msg:"mesage recieve"});
  console.log("received body:: ");
  console.log(req.body);
  const {_id,title,summary,content}=req.body;
  console.log(req.body._id);

  try{
    const updateDoc=await postModel.updateOne({_id},{
    $set:{title,summary,content}});

    console.log("Update odijbjhib::::")
    console.log(updateDoc)
}
  catch(err){
    console.log("DB error:  "+err)
  }

})  

app.put("/updateprofile", uploadMiddleware.single('file'), async(req,res)=>{
  console.log("received body:: ");
  console.log(req.body);
  const {_id,username,firstName,lastName,email}=req.body;
  console.log(req.body._id);

  try{
    

    const currDoc=await userModel.findById(_id);
    console.log("currc od username:   ")
    console.log(currDoc.username);
    console.log(username);
    const updateAuthorName=await postModel.updateMany({author:currDoc.username},{
      $set:{author:username}
    })

    console.log("authorn name ", updateAuthorName)

    const updateDoc=await userModel.updateOne({_id},{
      $set:{firstName,lastName,email,username}});

    console.log("Update odijbjhib::::")
    console.log(updateDoc)

    const newToken = jwt.sign({ id: _id, username, firstName, lastName, email }, jwtSecret);

    // Set the new token in the cookie
    res.cookie('token', newToken, { httpOnly: true });

    res.json({
      _id:_id,username:username,firstName:firstName,lastName:lastName,email:email
    });
}
  catch(err){
    console.log("DB error:  "+err)
  }

})  

app.post('/userprofile', async (req,res)=>{
  console.log("what we gotid wise")
  const {id}=req.body;
  console.log(id)
  const {_id, username,firstName,lastName,email,password}=await userModel.findById(id)

  console.log("what we gotid wise after")
    console.log(id)

  console.log(_id,username,email,firstName,lastName);

  res.json({
    id:_id,
    username:username,
    email:email,
    firstname:firstName,
    lastname:lastName,
  });
})
 
app.listen(3000)


//mongo Credentials
//username-upasana36897
//password-ZHmt0bctgEw1lP72
//connectionString-`mongodb+srv://upasana36897:ZHmt0bctgEw1lP72@blogspacecluster0.9dpdg.mongodb.net/?retryWrites=true&w=majority&appName=blogSpaceCluster0`