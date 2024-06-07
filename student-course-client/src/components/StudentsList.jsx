import React from 'react';
import { gql, useQuery } from "@apollo/client";
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

const GET_STUDENTS = gql`
  {
    students {
      id
      studentNumber
      userName
      email
      firstName
      lastName
      address
      city
      phoneNumber
      program
    }
  }
`;


const StudentsList = () => {
  const { loading, error, data, refetch } = useQuery(GET_STUDENTS);

  if (loading) return <Spinner animation="border" role="status" className="loading-spinner" />;
  if (error) {
    console.error('Error fetching courses:', error);
    return <p>Error: Failed to fetch student details</p>;
  }

  return (
    <div className="students-list">
      <h2>Students List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Number</th>
            <th>User Name</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Phone Number</th>
            <th>Program</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.students.map((student) => (
            <tr key={student.id}>
              <td>{student.studentNumber}</td>
              <td>{student.userName}</td>
              <td>{student.email}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.address}</td>
              <td>{student.city}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.program}</td>
              <td>
                <Link to={`/editstudent/${student.id}`} className="edit-link">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="center">
        <button className="refetch-button" onClick={() => refetch()}>Refetch</button>
      </div>
    </div>
  );
};

export default StudentsList;
