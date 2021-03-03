const mongoose = require('mongoose');

// options (object)
// const config = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }

mongoose.connect('mongodb://localhost/gaSpaceX', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}: ${db.port}`);
});

db.on('error', (err) => {
    console.log('======> ERROR');
    console.log(err);
});


module.exports = {
    Landpad: require('./landpad'),
}