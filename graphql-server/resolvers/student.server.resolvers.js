const Student = require('../models/student.server.model');

// Resolver function to get all students
const getStudents = async () => {
  try {
    const students = await Student.find();
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students');
  }
};

// Resolver function to get a student by ID
const getStudentById = async (_, { id }) => {
  try {
    const student = await Student.findById(id);
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    return student;
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    throw new Error('Failed to fetch student');
  }
};

// Resolver function to add a student
const addStudent = async (_, args) => {
  try {
    const student = new Student(args);
    await student.save();
    return student;
  } catch (error) {
    console.error('Error adding student:', error);
    throw new Error('Failed to add student');
  }
};

// Resolver function to update a student
const updateStudent = async (_, args) => {
  try {
    const { id, ...update } = args;
    const options = { new: true };
    let student = await Student.findByIdAndUpdate(id, update, options);

    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }

    // No need to explicitly call save since findByIdAndUpdate already saves the document

    return student;
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Failed to update student');
  }
};

// Resolver function to delete a student
const deleteStudent = async (_, { id }) => {
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    return student;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error('Failed to delete student');
  }
};

// Export resolvers
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
};
