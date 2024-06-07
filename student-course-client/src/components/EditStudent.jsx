import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GET_STUDENT = gql`
  query GetStudent($id: String!) {
    student(id: $id) {
      firstName
      lastName
      email
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: String!, $firstName: String!, $lastName: String!, $email: String!) {
    updateStudent(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;

function EditStudent() {
  const [student, setStudent] = useState({ id: '', firstName: '', lastName: '', email: '' });
  const { id } = useParams(); // Get the id parameter from the URL
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_STUDENT, {
    variables: { id },
    onCompleted: (data) => {
      const { firstName: currentFirstName, lastName: currentLastName, email: currentEmail } = data.student;
      setStudent({ id, firstName: currentFirstName, lastName: currentLastName, email: currentEmail });
    },
  });

  const [updateStudent] = useMutation(UPDATE_STUDENT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateStudent({ variables: { id, ...student } });
      navigate('/studentslist');
    } catch (error) {
      console.error('Error updating student:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Edit Student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={student.firstName || data.student.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={student.lastName || data.student.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            value={student.email || data.student.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={updateLoading}>
          {updateLoading ? 'Updating...' : 'Submit'}
        </Button>

        {updateError && <p>Error updating student: {updateError.message}</p>}
      </Form>
    </div>
  );
}

export default EditStudent;
