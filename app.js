
const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const lodash = require('lodash');
const yargs = require('yargs');

var argv = yargs.command('add','Add a new note',{
  title : {
    describe:'Title of note',
    demand: true,
    alias:'t'
  },
  body:{
    describe:'Body of the note',
    demand:true,
    alias:'b'
  }
}).command('list','List all the notes')
.command('read','Read an existing note',{
  title : {
    describe:'Title of note',
    demand: true,
    alias:'t'
  }})
  .command('remove','Remove a existing note',{
    title : {
      describe:'Title of note',
      demand: true,
      alias:'t'
    }}).help().argv;
var command = argv._[0];

if(command=='add'){
    var note = notes.addNote(argv.title,argv.body);
  if(note){
    console.log('Note created');
    notes.logNote(note);
  }
  else {
    console.log('Note already exists');
  }
}
else if(command=='list'){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) =>{
    notes.logNote(note);
  });
}
else if(command=='read'){
    var note =notes.getNote(argv.title);
  if(note)
  {
    notes.logNote(note);
  }
  else {
    {
      console.log('Note not found');
    }
  }
}
else if(command=='remove'){
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? `${argv.title} is removed` : 'Note not found';
  console.log(message);
}

// var user = os.userInfo();
//
// fs.appendFile('greetings.txt',`Hello ${user.username}`, (err) => {
//   if(err)
//     throw err;
//   else
//     console.log('File is appended');
// });
