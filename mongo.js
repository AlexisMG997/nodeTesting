const mongoose = require('mongoose');

// Validates if the command has the password on it 
if (process.argv.length<3){
    console.log('Give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://AlexisMG:${password}@cluster0.reoa7qk.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

// Creates a mongo schema
const noteSchema = new mongoose.Schema({
    content: String, 
    important: Boolean
});

// Create a model by the schema
const Note = mongoose.model('Note', noteSchema);
/** Code to add new collection to the DB.
//Adds a new collection to the DB
const note = new Note({
    content: 'HTML is Easy',
    important: true,
});

// Saves the result and close the connection with the DB.
note.save().then( result => {
    console.log('note saved!');
    mongoose.connection.close();
}) */

// Printing notes stores in the DB
Note.find({important: true}).then( result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close();
})