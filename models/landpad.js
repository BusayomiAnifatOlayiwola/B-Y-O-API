
const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a capsuleSchema
const landpadSchema = new Schema({
    name: { type: String, unique: true },
    type: String,
    region: String,
    latitude: Number,
    longitude: Number
});

// Model
const Landpad = mongoose.model('Landpad', landpadSchema);

module.exports = Landpad;