import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.STRING_URI;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
async function run(res) {
try {
    // Connect the client to the server	(optional starting in v4.7)
    
    // Send a ping to confirm a successful connection
    await client.db("blog").command({ ping: 1 });
    const posts = await client.db("blog").collection("posts").find({} , {}).toArray();
    
    console.log(posts);
    res.send(posts);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
}
}
async function insertPost(req,res) {
try {
    // Connect the client to the server	(optional starting in v4.7)
    
    // Send a ping to confirm a successful connection
    await client.db("blog").command({ ping: 1 });
    const element={title:"mon second titre" , content:"ça seulement c'est mon contenu tu vois là"}
    const result = await client.db("blog").collection("posts").insertOne(req.body);
    
    console.log(result);
    res.send(result);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
}
}

async function updatePost(res) {
    const col = await client.db("blog").collection("posts");
    const filtre = { title: "my title" }
    const updoc = {
        $set: {
            content: "mon contenu modifié"
        }
    };
    const options = {upsert:true}
    const result = await col.updateOne(filtre, updoc, options);
    console.log(result);
    res.send(result);
}

async function deletePost(res) {
    const col = await client.db("blog").collection("posts");
    const query = {  }
    const result = await col.deleteOne(query);
    if (result.deletedCount === 1) {
        console.log("delete successfully!");
        res.send("delete successfully!");
    } else {
        console.log(" not delete !");
        res.send("not delete !");
    }
}

module.exports = {run, insertPost, updatePost, deletePost};