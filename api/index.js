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
import { getLikeCount,getTopAuthors,getFollowedPosts,getPostCountByAuthor,insertIntoCommentsTable,getAllComments,checkIfLiked,deleteFromLikesTable,insertIntoLikesTable,getFollowingList,getFollowerList,getFollowingByUsername,getFollowersByUsername,unfollowAuthor,checkIfFollow,getUserByUsername,addUniqueConstraint,insertIntoUsersTable,createUsersTable,createFollowsTable,getUserById, updateUserDetailsById, createPostsTable, insertIntoPostsTable, insertIntoFollowsTable,getAllPost, getPostByAuthor, getPostById, updatePostDetailsById, udpateAuthorNameChange,deletePostById} from './db_resources/crud.js';

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
//createPostsTable()
//createFollowsTable();
//addUniqueConstraint();

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

// follow a author 
app.post('/followauthor',async(req,res)=>{
  const {username,author}=req.body;
  console.log("Author:  ",author, "User: ",username);

  try{
    const followsDoc=await insertIntoFollowsTable(username, author);
    console.log("flowo docnew code",followsDoc,"bw")
    if(followsDoc==1){
        res.json({
        msg:"Followed succesfully",
        value:followsDoc
      })
      console.log(req.body);
    }
    else if(followsDoc=='23505'){
      res.json({
        msg:"User already follows the author",
        value:0
      })
    }

    
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
  
})

// check if a user follows a author
app.get('/checkFollow/:username/:author',async(req,res)=>{
  const {username,author}=req.params;
  console.log("Author:  ",author, "User: ",username);

  try{
    const followsDoc=await checkIfFollow(username, author);
    console.log("oes follow",followsDoc,"bw")
    if(followsDoc.rows[0].exists){
        res.json({
        msg:"user follows author",
        value:true
      })
      console.log(req.body);
    }
    else if(!followsDoc.rows[0].exists){
      res.json({
        msg:"User not follows author",
        value:false
      })
    }
    
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
  
})

// end point to unfollow the author
app.delete('/unfollowauthor/:username/:author',async(req,res)=>{
  const {username,author}=req.params;
  console.log("Author:  ",author, "User: ",username);

  try{
    const unfollowDoc=await unfollowAuthor(username, author);
    console.log("oes follow",unfollowDoc,"bw")
    if(unfollowDoc==1){
        res.json({
        msg:"user unfollowed author",
        value:true
      })
    }
    else if(unfollowDoc==0){
      res.json({
        msg:"User not follows author or error unfollowing",
        value:false
      })
    }
    
  }
  catch(err){
    res.status(500).json({ error: err.message });
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
  console.log("Update *********************************************************************************************************")
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

// get followers count 
app.get('/getfollowers/:username',async(req,res)=>{
  const {username}=req.params;

  try {
    const getFollowersDoc=await getFollowersByUsername(username);
    console.log("follwers DOC",getFollowersDoc);
    res.json({msg:getFollowersDoc})
  } 
  
  catch (error) {
    
  }

})

// get following count  
app.get('/getfollowing/:username',async(req,res)=>{
  const {username}=req.params;

  try {
    const getFollowersDoc=await getFollowingByUsername(username);
    console.log("following DOC",getFollowersDoc);
    res.json({msg:getFollowersDoc})
  } 
  
  catch (error) {
    
  }

})

// get following list 
app.get('/getfollowinglist/:username',async(req,res)=>{
  const {username}=req.params;
  const followingList=[];
  try {
    const getFollowersDoc=await getFollowingList(username);
    console.log("following list DOC",getFollowersDoc.rows);
    res.json({msg:getFollowersDoc.rows})
  } 
  
  catch (error) {
    
  }

})

// get followers list 
app.get('/getfollowerslist/:username',async(req,res)=>{
  const {username}=req.params;
  const followerList=[];


  try {
    const getFollowersDoc=await getFollowerList(username);
    console.log("followers list DOC",getFollowersDoc.rows);
    res.json({msg:getFollowersDoc.rows})
  } 
  
  catch (error) {
    
  }

})

// like a post 
app.post('/likepost',async (req,res)=>{

  const {post_id,username}=req.body;
  try {
    const response=await insertIntoLikesTable(username,post_id);

    if(response==1){
      res.json({msg:"Post Liked...",likeStatus:true});
    }
    else{
      res.json({msg:"Post not Liked...",likeStatus:false});

    }
  }
  catch(err){
    console.log("Error liking post",err);
    res.json({msg:err})
  }

})

// unlike a post 
app.post('/unlikepost',async (req,res)=>{

  const {post_id,username}=req.body;
  try {
    const response=await deleteFromLikesTable(username,post_id);

    if(response==1){
      res.json({msg:"Post unliked...",unlikeStatus:true});
    }
    else{
      res.json({msg:"Post not unliked...",unlikeStatus:false});

    }
  }
  catch(err){
    console.log("Error unliking post",err);
    res.json({msg:err})
  }
})

app.get('/checkifliked/:post_id/:username',async (req,res)=>{

  const {post_id,username}=req.params;
  try {
    const response=await checkIfLiked(username,post_id);

    if(response==1){
      res.json({msg:"Post checked for like...",userLikedStatus:true});
    }
    else if(response==0){
      res.json({msg:"Post may checked for like...",userLikedStatus:false});
    }
    else if(response==-1){
      res.json({msg:"Post can't be checked for like..."});

    }
  }
  catch(err){
    console.log("Error unliking post",err);
    res.json({msg:err})
  }
})

app.get("/comments/:post_id",async(req,res)=>{
    const {post_id}=req.params;

    const comments=await getAllComments(post_id)
    console.log("POPPER LOG:",comments);
    try {
      if(comments.length>0){
        res.json({comments:comments,gotComments:true,number:comments.length})
  
      }
      else{
        res.json({comments:comments,gotComments:false,number:0})
  
      }
      console.log("all comments:  ",comments.rows)
    } catch (error) {
      console.log("Error getting all comments",error);
      res.json({msg:error,gotComments:false})

    }
  
})

//post a comment
app.post("/postcomments",async(req,res)=>{

  try {
    const {post_id,username,content}=req.body;

    const comments=await insertIntoCommentsTable(post_id,username,content)

    if(comments==1){
      res.json({commentInserted:true})
    }
    else if(comments==0){
      res.json({commentInserted:false})

    }
    else{
      res.json({commentInserted:false,msg:comments})

    }

  } catch (error) {
    console.log("Error:",error);
    res.json({msg:error,commentInserted:false})
  }

})

// get total number of post by a author plsql
app.get('/postcount/:author', async (req, res) => {
  const { author } = req.params;
  
  try {
    const postCount = await getPostCountByAuthor(author);
    res.json({ postCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post count' });
  }
});

// get all post by a followed author nested
app.get('/followedposts/:username', async (req, res) => {
  const { username } = req.params;
  console.log("🔍 Fetching posts followed by:", username);

  try {
    const followedPosts = await getFollowedPosts(username);
    res.json(followedPosts);
  } catch (err) {
    console.error(" Error fetching followed posts:", err);
    res.status(500).json({ error: "Failed to fetch followed posts" });
  }
});

// to get top authors trending ones nested query
app.get('/topauthors', async (req, res) => {
  try {
    const topAuthors = await getTopAuthors(); 
    res.json(topAuthors);
  } catch (err) {
    console.error("Error fetching top authors:", err);
    res.status(500).json({ error: "Failed to fetch top authors" });
  }
});

// get number of likes plsql
app.get('/likescount/:postId', async (req, res) => {
  const {postId} = req.params;
  const count = await getLikeCount(postId);
  res.json({ postId, likeCount: count });
});

app.listen(3000)

