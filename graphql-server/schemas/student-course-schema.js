// Import resolvers for each operation
const { updateUser } = require('../resolvers/student.server.resolvers');

// user-article-schema.js
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');

const StudentModel = require('../models/student.server.model'); // Import Student model
const CourseModel = require('../models/course.server.model'); // Import Course model

const userType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: GraphQLID },
    studentNumber: { type: GraphQLString },
    studentName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    program: { type: GraphQLString },
  }),
});

const courseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    id: { type: GraphQLID },
    courseCode: { type: GraphQLString },
    courseName: { type: GraphQLString },
    section: { type: GraphQLString },
    semester: { type: GraphQLString },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    students: {
      type: new GraphQLList(userType),
      resolve: () => StudentModel.find().exec(),
    },
    student: {
      type: userType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => StudentModel.findById(id).exec(),
    },
    courses: {
      type: new GraphQLList(courseType),
      resolve: () => CourseModel.find().exec(),
    },
    course: {
      type: courseType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => CourseModel.findById(id).exec(),
    },
    // Add resolver for listing all courses taken by a student
    coursesByStudent: {
      type: new GraphQLList(courseType),
      args: { studentId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, { studentId }) => CourseModel.find({ students: studentId }).exec(),
    },
  }),
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Define mutations for adding, updating, and deleting students and courses
    addStudent: {
      type: userType,
      args: {
        studentNumber: { type: new GraphQLNonNull(GraphQLString) },
        studentName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        program: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => StudentModel.create(args),
    },
    // Define mutations for updating and deleting students
    updateStudent: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        studentNumber: { type: GraphQLString },
        studentName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        program: { type: GraphQLString },
      },
      resolve: (_, args) => StudentModel.findByIdAndUpdate(args.id, args, { new: true }).exec(),
    },
    deleteStudent: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, { id }) => StudentModel.findByIdAndDelete(id).exec(),
    },
    // Define mutations for adding, updating, and deleting courses
    addCourse: {
      type: courseType,
      args: {
        courseCode: { type: new GraphQLNonNull(GraphQLString) },
        courseName: { type: new GraphQLNonNull(GraphQLString) },
        section: { type: new GraphQLNonNull(GraphQLString) },
        semester: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => CourseModel.create(args),
    },
    updateCourse: {
      type: courseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        courseCode: { type: GraphQLString },
        courseName: { type: GraphQLString },
        section: { type: GraphQLString },
        semester: { type: GraphQLString },
      },
      resolve: (_, args) => CourseModel.findByIdAndUpdate(args.id, args, { new: true }).exec(),
    },
    deleteCourse: {
      type: courseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, { id }) => CourseModel.findByIdAndDelete(id).exec(),
    },
    // Define mutation for adding a student to a course
    addStudentToCourse: {
      type: courseType,
      args: {
        courseId: { type: new GraphQLNonNull(GraphQLID) },
        studentId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { courseId, studentId }) => {
        const course = await CourseModel.findById(courseId).exec();
        if (!course) throw new Error(`Course not found with ID: ${courseId}`);
        course.students.push(studentId);
        await course.save();
        return course;
      },
    },
  }),
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutationType });
