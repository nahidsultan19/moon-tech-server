const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const cors = require('cors');

app.use(cors());
app.use(express.json());

// db_user= admin
// db_pass = 9aqIPuXcVfk3k92V


const uri = "mongodb+srv://admin:9aqIPuXcVfk3k92V@cluster0.pbygcug.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

const run = async () => {
    try {
        await client.connect();
        const productCollection = client.db("moontech").collection("products");

        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query);
            const product = await cursor.toArray();
            res.send({ status: true, data: product })
        });

        app.post('/product', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        });

        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const result = await productCollection.deleteOne({ _id: ObjectId(id) });
            res.send(result);
        });


    } finally {

    }
};

run().catch((err) => console.log(err));







app.get('/', (req, res) => {
    res.send('App is running');
});

app.listen(port, () => {
    console.log('App Listening to port', port);
})