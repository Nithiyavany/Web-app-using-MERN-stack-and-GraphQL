import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';


// Import components
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import LoginUser from './components/LoginUser';
import AddCourse from './components/AddCourse';
import EditStudent from './components/EditStudent';
import ListCourses from './components/ListCourses';
import CoursesHome from './components/CoursesHome';
import StudentsList from './components/StudentsList';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">
          Student and Course Management System with React and GraphQL
          </Navbar.Brand>
          </Container>
          
          <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="nav navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/addstudent">
                Add Student
              </Nav.Link>
              <Nav.Link as={Link} to="/studentslist">
                Student List
              </Nav.Link>
              <Nav.Link as={Link} to="/addcourse">
                Add Course
              </Nav.Link>
              <Nav.Link as={Link} to="/listcourses">
                List Courses
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginUser />} />
          <Route path="studentslist" element={<StudentsList />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="editstudent/:id" element={<EditStudent />} />
          <Route path="addcourse" element={<AddCourse />} />
          <Route path="listcourses" element={<ListCourses />} />
          <Route path="courseshome" element={<CoursesHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
