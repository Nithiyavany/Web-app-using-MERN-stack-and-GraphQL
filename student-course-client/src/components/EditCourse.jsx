import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

const EDIT_COURSE = gql`
  mutation EditCourse($id: ID!, $courseCode: String!, $courseName: String!, $section: String!, $semester: String!) {
    updateCourse(id: $id, courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const EditCourse = ({ courseId, existingCourse, onClose }) => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');

  useEffect(() => {
    // Populate the state with existing course data when the component mounts
    if (existingCourse) {
      setCourseCode(existingCourse.courseCode);
      setCourseName(existingCourse.courseName);
      setSection(existingCourse.section);
      setSemester(existingCourse.semester);
    }
  }, [existingCourse]);

  const [editCourse] = useMutation(EDIT_COURSE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCourse({ variables: { id: courseId, courseCode, courseName, section, semester } });
      onClose();
    } catch (err) {
      console.error('Error editing course:', err);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Code:</label>
          <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
        </div>
        <div>
          <label>Course Name:</label>
          <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </div>
        <div>
          <label>Section:</label>
          <input type="text" value={section} onChange={(e) => setSection(e.target.value)} />
        </div>
        <div>
          <label>Semester:</label>
          <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCourse;
