const express = require("express")
const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.json())

const cors = require("cors");

app.use(cors({
    origin:"https://gifted-shannon-b32b53.netlify.app"
}))

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
// const dbUrl = "mongodb://localhost:27017"
const dbUrl = "mongodb+srv://varghese:varghese@cluster0.brthd.mongodb.net/<dbname>?retryWrites=true&w=majority"
app.use(express.json())




//open a connection with DB
//selecting DB
//selecting DB collection
//perform DB operations
//close the connection

app.get("/students",async(req,res)=>{
    try {
        client = await mongoClient.connect(dbUrl);
        let db = client.db("b19wd");
        let students = await db.collection("students").find().toArray();
        client.close();
        res.json(students);
        
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
})

app.post("/student",async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19wd");
        await db.collection("students").insertOne({name:req.body.name});
        client.close();
        res.json({
                message: "success"
            })
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
        
    }
})

app.get("/student/:id", async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19wd");
        let id = mongodb.ObjectID(req.params.id);
        let student = await db.collection("students").findOne({_id:id});
        client.close();
        res.json(student)
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }
})

app.put("/student/:id",async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19wd");
        let id = mongodb.ObjectID(req.params.id);
        let student = await db.collection("students").updateOne({_id:id},{$set:{name:req.body.name}})
        client.close();
        res.json(student)
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }
})

app.delete("/student/:id",async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19wd");
        let id = mongodb.ObjectID(req.params.id);
        let student = await db.collection("students").findOneAndDelete({_id:id});
        client.close();
        res.json(student)
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }
})

let port = 3000
app.listen(process.env.PORT || port,()=>{
    console.log(`port open ${port}`)
})