import connectDB from "./connectDB.js";
import { pool } from "./connectDB.js";

//file name changed

// plsql func returns total number of post by author

// Function to create the PL/pgSQL function for counting posts by author
export async function createGetPostCountFunction() {
    const createFunctionQuery = `
      CREATE OR REPLACE FUNCTION get_post_count_by_author(author_username TEXT)
      RETURNS INT AS $$
      BEGIN
        RETURN (SELECT COUNT(*) FROM posts WHERE author = author_username);
      END;
      $$ LANGUAGE plpgsql;
    `;
  
    try {
      // Execute the function creation query
      await pool.query(createFunctionQuery);
      console.log('PL/pgSQL function created successfully.');
    } catch (err) {
      console.error('Error creating PL/pgSQL function:', err);
      throw err;
    }
  }


// Function to get the post count by author from the database using the function
export async function getPostCountByAuthor(author) {
    createGetPostCountFunction()
    const values=[author]
    try {
      const result = await pool.query('SELECT get_post_count_by_author($1) AS post_count', values);
      return result.rows[0].post_count; 
    } catch (err) {
      console.error('Error fetching post count by author:', err);
      throw err;
    }
}

// function to get following post 
export async function getFollowedPosts(username) {
    const values = [username];
    try {
      console.log("⏳ Fetching posts from followed authors (using nested subquery)...");
      
      const res = await pool.query(
        `
        SELECT *
        FROM posts
        WHERE author IN (
          SELECT authorname
          FROM follows
          WHERE username = $1
        )
        ORDER BY created_at DESC;
        `,
        values);
  
      console.log(" Followed posts fetched:", res.rows);
      return res.rows;
    } catch (err) {
      console.log(" Error fetching followed posts: ", err);
      return [];
    }
  }

// function to trending authors nested query
export async function getTopAuthors() {
    try {
      console.log("⏳ Getting top author(s)...");
  
      const res = await pool.query(`
        SELECT 
           u.username,
           u.firstname,
           u.lastname,
           (SELECT COUNT(*) FROM posts p WHERE p.author = u.username) AS post_count
        FROM users u
        WHERE (SELECT COUNT(*) FROM posts p WHERE p.author = u.username) > 0  -- This ensures we only include authors who have posts
        ORDER BY post_count DESC;
      `);
  
      console.log("Top author(s):", res.rows);
      return res.rows;
    } catch (err) {
      console.error("Error fetching top author(s):", err);
      return [];
    }
  }

//get count of likes plsql

export async function defineGetLikeCount(){
    const query = `
      CREATE OR REPLACE FUNCTION getLike_count(post_id_input INTEGER)
      RETURNS INTEGER AS $$
      DECLARE
          like_count INTEGER;
      BEGIN
          SELECT COUNT(*) INTO like_count FROM likes WHERE post_id = post_id_input;
          RETURN like_count;
      END;
      $$ LANGUAGE plpgsql;
    `;
  
    try {
      await pool.query(query);
      console.log("✅ PostgreSQL function 'get_like_count' created/updated successfully.");
    } catch (err) {
      console.error("❌ Error creating 'get_like_count' function:", err.message);
    }
  };


  //calling of plsql
export async function  getLikeCount(postId){
defineGetLikeCount();
        try {
            const result = await pool.query(`SELECT getLike_count($1) AS count`, [parseInt(postId)]);
            return result.rows[0].count;
        } catch (err) {
            console.error("❌ Error fetching like count:", err.message);
            return null;
        }
};


// function to create users table
export async function createUsersTable(){
    try {   
        //await connectDB();
        console.log("⏳ Creating Users table...");
        const res=await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(150),
                password VARCHAR(200),
                firstname VARCHAR(150),
                lastname VARCHAR(150),
                email VARCHAR(150)
            );
        `)

        console.log("Res for creation of users table:   ", res, " Table Created Succesfully");

    }
    catch(err){
        console.log("Users Table not created: ",err);
    }

}

//add constraint to Users table
export async function addUniqueConstraint(){
    try {   
        //await connectDB();
        console.log("⏳ Adding Constraint Users table...");
        const res=await pool.query(`
        ALTER TABLE follows ADD CONSTRAINT unique_follow UNIQUE (username, authorname);

        `)

        console.log("res for unique constint:   ", res, " Table Created Succesfully");

    }
    catch(err){
        console.log("constaint nort added  not created: ",err);
    }

}

//function to create Posts Table
export async function createPostsTable(){
    try {   
        //await connectDB();
        console.log("⏳ Creating Posts table...");
        const res=await pool.query(`
            CREATE TABLE IF NOT EXISTS posts(
                id SERIAL PRIMARY KEY,
                title VARCHAR(50),
                summary VARCHAR(200),
                content VARCHAR(800),
                author VARCHAR(50),
                cover VARCHAR(200)
            );
        `)

        console.log("Res for creation of users table:   ", res, " Table Created Succesfully");

    }
    catch(err){
        console.log("Posts Table not created: ",err);
    }

}

//function to create Follows Table
export async function createFollowsTable(){
    try{
        //await connectDB();

        console.log("⏳ Creating Follows table...");
        const res=await pool.query(`
        
        CREATE TABLE IF NOT EXISTS follows (
            id SERIAL PRIMARY KEY,
            username VARCHAR(150) NOT NULL,
            authorname VARCHAR(150) NOT NULL,
            followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
            FOREIGN KEY (authorname) REFERENCES users(username) ON DELETE CASCADE,
            UNIQUE (username, authorname)
        );
        `)
        console.log("Res for creation of follows table:   ", res, " Table Created Succesfully");

    }
    catch(err){
        console.log("Follows Table not created: ",err);
    }

}

// function to create comment Table

export async function createCommentTable(){
    try{
        console.log("⏳ Creating Comment table...");
        const res=await pool.query(`
        CREATE TABLE IF NOT EXISTS comments (
            comment_id SERIAL PRIMARY KEY,
            post_id INTEGER NOT NULL,
            username VARCHAR(30) NOT NULL,
            comment_text VARCHAR(300) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
            CONSTRAINT fk_post
                FOREIGN KEY (post_id)
                REFERENCES posts(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
        
            CONSTRAINT fk_user
                FOREIGN KEY (username)
                REFERENCES users(username)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        );
        
        `)
    }
    catch(err){

    }
} 

//function to insert into table
export async function insertIntoCommentsTable(post_id,username,comment){
    const values=[post_id,username,comment]
    try {
        const res = await pool.query(`
          INSERT INTO comments (post_id, username, comment_text, created_at)
          VALUES ($1, $2, $3, DEFAULT)
          RETURNING *;
        `, values);
    
        if (res.rowCount > 0) {
          console.log("✅ Comment inserted:", res);
          return 1;
        }
        else{
            console.log("✅ Comment not inserted:", res);
            return 0;
        }
      } 
      catch (error) {
        console.error("❌ Error inserting comment:", error);
        return -1;
      }
}

//function to get all comments
export async function getAllComments(post_id){
    const values=[post_id];
    try {
        console.log("⏳ Getting all comments...");

        const res = await pool.query(`SELECT * FROM comments
                WHERE post_id = $1
                ORDER BY created_at ASC;
        `,values);

        console.log("✅ Comments fetched: ", res);

        return res.rows;

    } catch (error) {
        console.log("❌ Error fetching comments: ", err);
        return [];
    }
}

//function to create like table
export async function createLikeTable(){
    try{
        //await connectDB();

        console.log("⏳ Creating Like table...");
        const res=await pool.query(`
        
        CREATE TABLE IF NOT EXISTS likes (
            like_id SERIAL PRIMARY KEY,
            username VARCHAR(150) NOT NULL,
            post_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            CONSTRAINT fk_user
                FOREIGN KEY (username)
                REFERENCES users(username)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
        
            CONSTRAINT fk_post
                FOREIGN KEY (post_id)
                REFERENCES posts(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
        
            CONSTRAINT unique_like
                UNIQUE (username, post_id)
        );
        
        `)
        console.log("Res for creation of like table:   ", res, " Table Created Succesfully");

    }
    catch(err){
        console.log("Like Table not created: ",err);
    }

}

//function to insert into like table
export async function insertIntoLikesTable(username,post_id){
    const values=[username,post_id];

    try {
        //await connectDB();
        console.log("⏳ Inserting into Like table...");
        const res=await pool.query(`
            INSERT INTO likes(username,post_id,created_at) values(
                $1,
                $2,
                DEFAULT
            ) RETURNING *;
        `,values)

        if(res.rowCount>0){
            console.log("✅ Row Insertion Succesfully, Res:    ",res);
            return 1;
        }
        else{
            return 0;
        }
      
    } catch (error) {
        console.log("❌ Error inserting in like table:   ",error)
        return -1;
    }

}

//function to delete from the likes table
export async function deleteFromLikesTable(username,post_id){
    const values=[username,post_id];

    try {
        //await connectDB();
        console.log("⏳ Deleting into Like table...");
        const res=await pool.query(`
            DELETE FROM likes
            WHERE username = $1 AND post_id = $2;        
        `,values)

        if(res.rowCount>0){
            console.log("✅ Row Deletion Succesfully, Res:    ",res);
            return 1;
        }
        else{
            return 0;
        }
      
    } catch (error) {
        console.log("❌ Error deleting in like table:   ",error)
        return -1;
    }

}

//function to check if a post liked by a user
export async function checkIfLiked(username,post_id){
    const values=[username,post_id];

    try {
        //await connectDB();
        console.log("⏳ Checking from Like table...");
        const res=await pool.query(`
                SELECT * FROM likes
                WHERE username = $1 AND post_id = $2;
        `,values)

        if(res.rowCount>0){
            console.log("Post liked by the user...",res);
            return 1;
        }
        else{
            console.log("Post may not be liked by the user...",res);
            return 0;
        }
    } catch (error) {
        console.log("❌ Error checking from like table:   ",error)
        return -1;
    }

}


//function to get the followers of a user
export async function getFollowersByUsername(username){
    const values=[username];
    try {
        //awit connectDB();

        console.log("⏳ Getting all the followers");
        const res=await pool.query(`
        SELECT COUNT(*) AS follower_count
        FROM follows
        WHERE authorname = $1;
        `,values)

        console.log("Res for the number of followers is:", res, " Fetched suucesfully...")
        return res.rows[0];


    } catch (err) {
        console.log("Problem getting number of users:   ",err);
    }
}

//get following for author from username 

export async function getFollowingByUsername(username){
    const values=[username];
    try {
        //awit connectDB();

        console.log("⏳ Getting all the following");
        const res=await pool.query(`
        SELECT COUNT(*) AS follower_count
        FROM follows
        WHERE username = $1;
        `,values)

        console.log("Res for the number of followers is:", res, " Fetched suucesfully...")
        return res.rows[0];


    } catch (err) {
        console.log("Problem getting number of users:   ",err);
    }
}

// get following list by username 
export async function getFollowingList(username){
    const values=[username];
    try {
        //awit connectDB();

        console.log("⏳ Getting all the following");
        const res=await pool.query(`
        SELECT authorname AS Following_list
        FROM follows WHERE username = $1;
        `,values)

        console.log("Res for the list of following is:", res, " Fetched list sucesfully...")
        return res;


    } catch (err) {
        console.log("Problem getting list of following:   ",err);
    }
}

//get follower list
export async function getFollowerList(username){
    const values=[username];
    try {
        //awit connectDB();

        console.log("⏳ Getting all the following");
        const res=await pool.query(`
        SELECT username AS Follower_List
        FROM follows WHERE authorname = $1;

        `,values)

        console.log("Res for the list of follower is:", res, " Fetched list suucesfully...")
        return res;


    } catch (err) {
        console.log("Problem getting list of follower:   ",err);
    }
}


// function to insert values in follows table
export async function insertIntoFollowsTable(username,author){
    const values=[username,author];

    try {
        //await connectDB();
        console.log("⏳ Inserting into Follows table...");
        const res=await pool.query(`
            INSERT INTO follows(username,authorname) values(
                $1,
                $2
            ) RETURNING *;
        `,values)

        if(res.rows.length>0){
            console.log("✅ Row Insertion Succesfully, Res:    ",res);
            return res.rows.length;
        }
      
    } catch (error) {
        if(error.code=='23505'){
            return'23505'

        }
        console.log("❌ Error inserting:   ",error)
    }

}
// function to insert values into posts tables
export async function insertIntoPostsTable(title,summary,content,author,cover){
    const values=[title,summary,content,author,cover];

    try {
        //await connectDB();
        console.log("⏳ Inserting into Users table...");
        const res=await pool.query(`
            INSERT INTO posts(title,summary,content,author,cover,created_at) values(
                $1,
                $2,
                $3,
                $4,
                $5,
                DEFAULT
            ) RETURNING *;
        `,values)

        console.log("✅ Row Insertion Succesfully, Res:    ",res);
        return res.rows[0];

    } catch (error) {
        console.log("❌ Error inserting:   ",error)
    }


}
// function to insert values into user tables
export async function insertIntoUsersTable(username,password,firstname,lastname,email){
    const values=[username,password,firstname,lastname,email];
    try{
        //await connectDB();
        console.log("⏳ Inserting into Users table...");
        const res=await pool.query(`
            INSERT INTO users(username,password,firstname,lastname,email) values(
                $1,
                $2,
                $3,
                $4,
                $5
            ) RETURNING *;
        `,values)

        console.log("✅ Row Insertion Succesfully, Res:    ",res);
    }
    catch(err){
        console.log("❌ Error inserting:   ",err)
    }
}

// function to check if a user follows a author
export async function checkIfFollow(username,author){
    const values=[username,author];

    try{        
        //await connectDB();
        console.log("⏳ Checking follow status...");
        const res=await pool.query(`
            SELECT EXISTS (
                SELECT 1 FROM follows 
                WHERE username = $1 AND authorname = $2
            );
        `,values)
        return res;

    }
    catch(err){
        console.log("❌ Error checking status:   ",err)

    }
}

// function to unfollow a author

export async function unfollowAuthor(username,author){
    const values=[username,author];
    
    try {
        console.log("⏳  Unfollowing the author...")
        const res=await pool.query(`
            DELETE FROM follows 
            WHERE username = $1 AND authorname = $2;
        `,values)

        if(res.rowCount>0){
            console.log("✅ entry deleted Succesfully, Res:    ",res);
            return 1;
        }
        else if(rowCount==0){
            return 0
        }
    } 
    catch (error) {
        console.log("Error unfollowing...", error);
        return -1;
    }
}
// fetch user details by username
export async function getUserByUsername(username){
    const values=[username];
    try{
        //await connectDB();
        console.log("⏳ Getting (Username) user details...");
        const res=await pool.query(`
            SELECT * FROM users where username=$1;
        `,values);

        console.log("✅ User Details, Res:    ",res.rows);
        const userDetails={
            id:res.rows[0].id,
            username:res.rows[0].username,
            password:res.rows[0].password,
            firstname:res.rows[0].firstname,
            lastname:res.rows[0].lastname,
            email:res.rows[0].email
        }
        return userDetails;
    }
    catch(err){
        console.log("❌ Error inserting:   ",err)
    }
}

// fetch post details by id
export async function getPostById(id){
    const values=[id];
    try{
        //await connectDB();
        console.log("⏳ Getting (ID) Post details...");
        const res=await pool.query(`
            SELECT * FROM posts where id=$1;
        `,values);

        console.log("✅ User Details, Res:    ",res.rows);
        const postDetails={
            id:res.rows[0].id,
            title:res.rows[0].title,
            summary:res.rows[0].summary,
            content:res.rows[0].content,
            author:res.rows[0].author,
            cover:res.rows[0].cover,
            created_at:res.rows[0].created_at
        }
        return postDetails;
    }
    catch(err){
        console.log("❌ Error fetching post:   ",err)
    }
}

// function to get posts by one author 

export async function getPostByAuthor(author){
    const values=[author];
    try{
        //await connectDB();
        console.log("⏳ Getting all posts by the author...");
        const res=await pool.query(`
            SELECT * FROM posts where author=$1;
        `,values);

        console.log("✅ User Details, Res:    ",res.rows);
      
        return res.rows;
    }
    catch(err){
        console.log("❌ Error fetching post:   ",err)
    }
}

// function to get all post 
export async function getAllPost(){
    try {
        console.log("⏳ Getting all posts...");

        const res = await pool.query(`SELECT * FROM posts;`);

        console.log("✅ Posts fetched: ", res);

        return res.rows;

    } catch (error) {
        console.log("❌ Error fetching posts: ", err);
        return [];
    }
}
// function to fetch user details by id
export async function getUserById(id){
    const values=[id];
    try{
        //await connectDB();
        console.log("⏳ Getting (ID) user details...");
        const res=await pool.query(`
            SELECT * FROM users where id=$1;
        `,values);

        console.log("✅ User Details, Res:    ",res.rows);
        const userDetails={
            id:res.rows[0].id,
            username:res.rows[0].username,
            password:res.rows[0].password,
            firstname:res.rows[0].firstname,
            lastname:res.rows[0].lastname,
            email:res.rows[0].email
        }
        return userDetails;
    }
    catch(err){
        console.log("❌ Error fetching user:   ",err)
    }
}

// function to update post details
export async function updatePostDetailsById(id,title,summary,content){
    const values=[id,title,summary,content];
    try{
        //await connectDB();
        const res=await pool.query(`
        UPDATE posts
        SET title = $2, summary = $3, content = $4
        WHERE id = $1
        RETURNING *;
        `,values);

        console.log("✅ User Details, Res:    ",res.rows);
        const postDetails={
            id:res.rows[0].id,
            title:res.rows[0].title,
            summary:res.rows[0].summary,
            content:res.rows[0].content,
            author:res.rows[0].author,
            cover:res.rows[0].cover
        }
        return postDetails;
    }
    catch(err){
        console.log("❌ Error inserting:   ",err)
    }
}

// function to update all post if author name changes
export async function udpateAuthorNameChange(oldname,newname){
    const values=[oldname,newname];
    try{
        //await connectDB();
        const res=await pool.query(`
        UPDATE posts
        SET author = $2
        WHERE author = $1
        RETURNING *;
        `,values);

        console.log("✅ User Details, Res:    ",res.rows);
        const postDetails={
            id:res.rows[0].id,
            title:res.rows[0].title,
            summary:res.rows[0].summary,
            content:res.rows[0].content,
            author:res.rows[0].author,
            cover:res.rows[0].cover
        }
        return postDetails;
    }
    catch(err){
        console.log("❌ Error inserting:   ",err)
    }
}


// function to update user Details
export async function updateUserDetailsById(id,username,firstname,lastname,email){
    const values=[id,username,firstname,lastname,email];
    try{
        //await connectDB();
        const res=await pool.query(`
        UPDATE users
        SET username = $2, firstname = $3, lastname = $4, email = $5
        WHERE id = $1
        RETURNING *;
        `,values);

        console.log("✅ User Details, Res:    ",res.rows);
        const userDetails={
            id:res.rows[0].id,
            username:res.rows[0].username,
            firstname:res.rows[0].firstname,
            lastname:res.rows[0].lastname,
            email:res.rows[0].email
        }
        return userDetails;
    }
    catch(err){
        console.log("❌ Error inserting:   ",err)
    }
}


export async function addCreatedAtColumn() {
    try {
        console.log("⏳ Adding 'created_at' column if not exists...");
        await pool.query(`
            ALTER TABLE posts 
            ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        `);
        console.log("✅ 'created_at' column added successfully!");
    } catch (err) {
        console.log("❌ Error adding 'created_at' column: ", err);
    }
}

export async function deletePostById(id){
    const value=[id];
    const isDeleted=0;

    try {
        //await connectDB();
        const res=await pool.query(`
        DELETE FROM posts WHERE id=$1`,value)
        
        if(res.rowCount>0){
            isDeleted=1;
            return isDeleted;
        }
        
    } catch (error) {
            console.log("Error Deleting the post", error)
            return isDeleted;
    }   
}

