import express from 'express';
import cors from 'cors';
import path from 'path';
const app = express();
const routes = express.Router();
const port = 4000;



app.use(cors());
app.use(express.json());
app.use("/posts", routes);
require("./routes")(routes);

const public_path = path.join(__dirname, '/build');
app.use(express.static(public_path));
app.get("*", (_, res) => {
    res.sendFile(path.join(public_path, 'index.html'));
})


// Create a MongoClient with a MongoClientOptions object to set the Stable API version



app.listen(port, ()=>{
    console.log("Hello I'm happy to be here");
})