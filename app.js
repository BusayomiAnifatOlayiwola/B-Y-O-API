const express = require('express');
const axios = require('axios');

// Set up App
const app = express();
const PORT = process.env.PORT || 8000;

// Database
const db = require('./models');


// Route
app.get('/v1', (req, res) => {
    res.send('Welcome to Busayomi Space X API');
});


// Get all landpads : GET /landpads
//     - Endpoint: https://api.spacexdata.com/v4/landpads
// Get one landpad : GET /landpads/:id

// name: { type: String, unique: true },
// type: String,
// region: String,
// latitude: Number,
// longitude: Number
        


app.get('/v1/fetch-landpads', async (req, res) => {
    // Run axios
    const response = await axios.get('https://api.spacexdata.com/v4/landpads');
    const data = response.data; // array of objects [{}, {}, {}]
   console.log(data)
    // add each object info to DB
    for (let i = 0; i < data.length; i++) {
        let landpadObject = data[i]; // object

        const { name, type, region, latitude, longitude } = landpadObject; // destructuring

        db.Landpad.create({
            name: name,
            type: type,
            region: region,
            latitude: latitude,
            longitude:longitude

        }, (err, newLandpad) => {
            console.log(newLandpad);
        });
    }

    res.json(data);
});



app.get('/v1/landpads', async (req, res) => {
    const fetchLandpads= await db.Landpad.find(); // array of objects
    res.json(fetchLandpads);
});

app.get('/v1/landpads/:name', async (req, res) => {
    // let name = req.params.name;
    const { name } = req.params;
    const fetchLandpad = await db.Landpad.find({ name });
    res.json(fetchLandpad);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
