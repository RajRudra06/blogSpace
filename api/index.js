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


// imports for postgress

import connectDB from './db_resources/connectDB.js';
import { getUserByUsername,insertIntoUsersTable,createUsersTable,getUserById, updateUserDetailsById, createPostsTable, insertIntoPostsTable, getAllPost, getPostByAuthor, getPostById, updatePostDetailsById, udpateAuthorNameChange,deletePostById} from './db_resources/crud.js';

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

//createUsersTable();
// createPostsTable()
connectDB()
  
// Postgress shifting is done 
app.post("/register",async(req,res)=>{
    const {username,password,lastName,firstName,email}=req.body
    try {
        const existingUser=await getUserByUsername(username);
        console.log(existingUser)
        if(existingUser){
          return res.status(400).json({
            msg:"User already exists"
          })
        }
        console.log("REnder Regostrtaion:: ")
        const userDoc=await insertIntoUsersTable(username, bcrypt.hashSync(password,saltKey),firstName,lastName,email);
        res.json({
          msg:"Registered Succesfully"
        })
      
    } catch (error) {
      res.status(400).json(error)
      console.log(error)
    }
    
})

// Postgress shifting is done 
app.post("/login",async(req,res)=>{
  const {username,password}=req.body
  try {
    const existingUser=await getUserByUsername(username);
    console.log("Existing user:::::::::",existingUser)
      const passOK=bcrypt.compareSync(password, existingUser.password);
      console.log(bcrypt.compareSync(password, existingUser.password))
      console.log(existingUser)
      if(existingUser!=null){
        if(passOK){
          jwt.sign({username,id:existingUser.id},jwtSecret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token', token,{
              httpOnly:true,
              sameSite:'lax',
              maxAge:30*24*60*60*1000
            }).json({
              id:existingUser.id,
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

// Postgress shifting is done 
app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    try {
      // Get the latest user data from database
      const user = await getUserById(info.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Return consistent property names
      res.json({
        id: user.id, // Use 'id' here to match frontend expectation
        username: user.username
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

// Postgress shifting is done 
app.get('/posts',async (req,res)=>{
  const posts=await getAllPost()
  res.json(posts);
})

app.post('/logout',(req,res)=>{
  res.cookie('token', '',{
    httpOnly:true,
    sameSite:'lax',
    expires: new Date(0)
  }).json('ok')
})

// Postgress shifting is done 
app.post('/createpost',uploadMiddleware.single('file'),async (req,res)=>{
  const {originalname,path}=req.file
  const parts =originalname.split('.')
  // extracting the extension of the original file thru splitting 
  const ext=parts[parts.length-1];
  const newPath=path+'.'+ext;
  fs.renameSync(path, newPath);

  const {title,summary,content,author}=req.body;
  const postDoc=await insertIntoPostsTable(title,summary,content,author,newPath)
  
  res.json({
    msg:"Post created succesfully",
    value:postDoc
  })

  console.log(req.body);
})

// Postgress shifting is done 
app.get('/post/:id',async (req,res)=>{
  const {id}=req.params;
  console.log(id);
  const postDoc=await getPostById(id);
  res.json(postDoc);

})

// Postgress shifting is done 
app.get('/authorpost/:author',async(req,res)=>{
  const {author}=req.params;
  console.log(author);

  try
  {
    const authorAllPost=await getPostByAuthor(author)
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

// Postgress shifting is done 
app.put("/updatepost", uploadMiddleware.single('file'), async(req,res)=>{
  res.json({msg:"mesage recieve"});
  console.log("received body:: ");
  console.log(req.body);
  const {id,title,summary,content}=req.body;
  console.log(req.body.id);

  try{
    const updateDoc=await updatePostDetailsById(id,title,summary,content)

    console.log("Update odijbjhib::::")
    console.log(updateDoc)
}
  catch(err){
    console.log("DB error:  "+err)
  }

})  

// Postgress shifting is done 
app.put("/updateprofile", uploadMiddleware.single('file'), async(req,res)=>{
  console.log("received body:: from update");
  console.log(req.body);
  const {id,username,firstName,lastName,email}=req.body;
  console.log(req.body);

  try{
    
    //updating author name for all posts
    const currDoc=await getUserById(id);
    console.log("currc od username:   ")
    console.log(currDoc.username);
    console.log(username);
    const updateAuthorName=await udpateAuthorNameChange(currDoc.username,username)

    console.log("authorn name ", updateAuthorName)

    const updateDoc=await updateUserDetailsById(id,username,firstName,lastName,email);

    console.log("Update odijbjhib::::",updateDoc)
    const newToken = jwt.sign({ id: id, username, firstName, lastName, email }, jwtSecret);

    // Set the new token in the cookie
    res.cookie('token', newToken, { httpOnly: true });

    res.json({
      id:updateDoc.id,username:updateDoc.username,firstName:updateDoc.firstname,lastName:updateDoc.lastname,email:updateDoc.email
    });
}
  catch(err){
    console.log("DB error:  "+err)
  }

})  

// Postgress shifting is done 
app.post('/userprofile', async (req,res)=>{
  console.log("what we gotid wise")
  const {id}=req.body;
  console.log(id)
  const {_id, username,firstname,lastname,email,password}=await getUserById(id)
  console.log(_id,username,firstname)
  console.log("what we gotid wise after")
    console.log(id)

  console.log(id,username,email,firstname,lastname);

  res.json({
    id:_id,
    username:username,
    email:email,
    firstname:firstname,
    lastname:lastname,
  });
})
 
app.delete('/delete/:id', async (req,res)=>{
  const {id}=req.params;

  try{

    const resOfDeletion = await deletePostById(id);
    if(resOfDeletion>0){
    return res.status(200).json({
      msg:"Post deleted Succesfully"
    })
  }

  else{
    return res.status(404).json({
      msg:"Post not found"
    })
  }

  res.status(200).json({
    msg:"hello ji"
  })

  }
  catch(err){
    console.error("Error deleting post:", err);
    return res.status(500).json({ msg: "Internal Server Error" })
  }
  
})
app.listen(3000)

