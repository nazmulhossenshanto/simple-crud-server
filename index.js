import { MongoClient, ServerApiVersion } from "mongodb";
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
const uri =
  "mongodb+srv://simple_crud_server:A98ib02rlQobQX2I@cluster0.t7anw6a.mongodb.net/?appName=Cluster0";

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