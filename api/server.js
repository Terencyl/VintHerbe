const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Terencyl:VintHerbeA7rbz@vintherbe.r6x3bwq.mongodb.net/?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})  
    .then(() => console.log("Connected to database"))
    .catch(console.error);

const Plant = require('./models/Plant');

app.get('/plants', async (req, res) => {
    const plants = await Plant.find();

    res.json(plants);
});

app.post('/plant/new', (req, res) => {
    const plant = new Todo({
        text: req.body.text,
        price: req.body.price,
        kind: req.body.kind
    })

    plant.save();

    res.json(plant);
});

app.listen(3001, () => console.log("Server started on port 3001"));