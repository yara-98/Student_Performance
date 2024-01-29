const sqlite3 = require('sqlite3').verbose(); // setting up the sqlite with the predefined schema
const fs = require('fs');
const path = require('path');
// ensuring that the created database file and the schema are in a relative directiry
const dbPath = path.join(__dirname, '..', 'student.db');
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');
// create database with object db
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  //reads the content of the shcema file and if there is any error it will error message will show
  console.log('Connected to the SQLite database.');
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error executing schema script:', err.message);
    } else {
      console.log('Schema executed successfully.');
    }
  });
});

module.exports = db;
