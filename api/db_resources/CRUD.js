import connectDB from "./connectDB.js";
import { pool } from "./connectDB.js";

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
        console.log("Table not created: ",err);
    }

}

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
        console.log("Table not created: ",err);
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
