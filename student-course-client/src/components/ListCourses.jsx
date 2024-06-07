import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import EditCourse from './EditCourse';
import { Button, Table, Spinner } from 'react-bootstrap';

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

const ListCourses = () => {
  const { loading, error, data, refetch } = useQuery(GET_COURSES);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [deleteCourse] = useMutation(DELETE_COURSE);

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse({ variables: { id: courseId } });
      refetch();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) {
    console.error('Error fetching courses:', error);
    return <p>Error: Failed to fetch courses</p>;
  }

  const handleRowClick = (courseId) => {
    setSelectedCourse(courseId);
  };

  return (
    <div>
      <h2>List of Courses</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.courses.map((course) => (
            <tr
              key={course.id}
              onClick={() => handleRowClick(course.id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.section}</td>
              <td>{course.semester}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteCourse(course.id)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedCourse && (
        <div>
          <h2>Edit Course</h2>
          <EditCourse
            courseId={selectedCourse}
            existingCourse={data.courses.find((course) => course.id === selectedCourse)}
            onClose={() => setSelectedCourse(null)}
          />
        </div>
      )}

      <Button  variant="success"  onClick={() => refetch()}>Refetch</Button>
    </div>
  );
};

export default ListCourses;
