import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

// AddStudent mutation
const ADD_STUDENT = gql`
  mutation AddStudent($studentNumber: String!, $studentName: String!, $email: String!, $password: String!, $address: String!, $city: String!, $phoneNumber: String!, $program: String!) {
    addStudent(studentNumber: $studentNumber, studentName: $studentName, email: $email, password: $password, address: $address, city: $city, phoneNumber: $phoneNumber, program: $program) {
      studentName
    }
  }
`;

// AddStudent component
const AddStudent = () => {
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [program, setProgram] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [addStudent] = useMutation(ADD_STUDENT);

  const saveStudent = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    try {
      await addStudent({ variables: { studentNumber, studentName, email, password, address, city, phoneNumber, program } });
      // Clear input fields
      setStudentNumber('');
      setStudentName('');
      setEmail('');
      setPassword('');
      setAddress('');
      setCity('');
      setPhoneNumber('');
      setProgram('');
      setShowLoading(false);
      navigate('/studentslist'); // navigate to student list page
    } catch (error) {
      console.error('Error creating student:', error);
      setShowLoading(false);
    }
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <h2>Create Student</h2>
      <Form className="student-label" onSubmit={saveStudent}>
        <Form.Group >
          <Form.Label>Student Number</Form.Label>
          <Form.Control type="text" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} placeholder="Enter student number" />
        </Form.Group>
        <Form.Group>
          <Form.Label> Name</Form.Label>
          <Form.Control type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter student name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Program</Form.Label>
          <Form.Control type="text" value={program} onChange={(e) => setProgram(e.target.value)} placeholder="Enter program" />
        </Form.Group>
        <br></br>
        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default AddStudent;
