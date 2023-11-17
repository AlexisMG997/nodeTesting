const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

const password = "vuuJeegeE8TrizAM";

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    });


// Creates a mongo schema
const noteSchema = new mongoose.Schema({
    content: String, 
    important: Boolean
});

// Create a model by the schema
const Note = mongoose.model('Note', noteSchema);

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Note', noteSchema);