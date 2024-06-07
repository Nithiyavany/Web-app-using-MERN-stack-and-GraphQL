const Course = require('../models/course.server.model');

// Resolver function to update a course
const updateCourse = async (_, args) => {
  try {
    const { id, ...update } = args;
    const options = { new: true };
    let course = await Course.findByIdAndUpdate(id, update, options);

    if (!course) {
      throw new Error(`Course with ID ${id} not found`);
    }

    // No need to explicitly call save since findByIdAndUpdate already saves the document

    return course;
  } catch (error) {
    console.error('Error updating course:', error);
    throw new Error('Failed to update course');
  }
};

// Other resolver functions for CRUD operations on courses can go here

module.exports = {
  // Include resolver functions for courses here...
  updateCourse,
};
