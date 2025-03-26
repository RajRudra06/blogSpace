import pkg from 'pg'
const {Pool}=pkg;

export const pool= new Pool({
    connectionString:"postgresql://neondb_owner:npg_qSXA7ifng4EO@ep-ancient-sunset-a5rzdsci-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
    max:30,
    idealTimeoutMillis:30000,
    connectionTimeoutMillis:15000
})

export default async function connectDB(){
    try {
        console.log("⏳ Connecting to DB...");
        const res=await pool.query("SELECT 1");
        if(res.rowCount==1){
            console.log("✅ Connected to NeonDB!    ");
        }
    }
    catch(err){
        console.log("❌ DB Connection Error:  ",err)
    }   
}
