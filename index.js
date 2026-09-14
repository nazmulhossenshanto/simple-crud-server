import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import express from "express";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Shanto your server is ok");
});

// Connect to MongoDB 
  const uri = "mongodb+srv://simple_crud_server:A98ib02rlQobQX2I@cluster0.pnssve1.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    // create user into database
    const usersDB = client.db('usersDB');
    const usersCollection = usersDB.collection('users');

    app.post('/users', async(req, res)=>{
      const newUser = req.body;
      console.log('user info from server', newUser);
      const result = await usersCollection.insertOne(newUser);
      res.send(result)
    });
    // get user from db

    app.get('/users', async(req, res)=>{
      // res.send('users get successfully');
      const users = await usersCollection.find().toArray();
      res.send(users)
    });

    // delete user from db
    app.delete('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const query = { _id : new ObjectId(id) };
      const result = await usersCollection.deleteOne(query)
    })

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB."
    );
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Simple CRUD server is running on port ${port}`);
});