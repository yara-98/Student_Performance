const db = require('./Database/table'); // import database by its path
const Student = {
  // Identify object that has methods to interact with the database.
  getAll: (callback) => {
    // will get all the information from the table
    db.all('SELECT * FROM student', (err, rows) => {
      if (err) {
        console.error('Error fetching students:', err.message); //if error accour this message will show
        return callback(err);
      }
      console.log('Fetched students:', rows);
      return callback(null, rows);
    });
  },
  getById: (id, callback) => {
    db.get('SELECT * FROM student WHERE student_id = ?', [id], callback); // will get a single student record
  },
};
module.exports = Student;
