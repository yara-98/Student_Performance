// import the models
const studentModel = require('./model'); // will Import the student model

// Controller functions
const StudetnController = {
  getstudent: async (req, res) => {
    try {
      const student = await studentModel.find(); // will retrieve all student in the database
      res.status(200).json(student); // It will send the student details as JSON response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getStudentById: async (req, res) => {
    try {
      const StudentId = req.params.id; // will get the user ID from the request parameters
      const student = await UserModel.findById(StudentId); //will match the user by his id
      if (!student) {
        return res.status(404).json({ message: 'student not found' });
      }
      res.status(200).json(student); // will send the user as JSON response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = StudetnController; //will export StudetnController
