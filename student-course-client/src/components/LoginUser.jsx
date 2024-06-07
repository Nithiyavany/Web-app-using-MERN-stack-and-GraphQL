import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CoursesHome from './CoursesHome';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

const LOGGED_IN_USER = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`;

function LoginUser() {
  let  navigate = useNavigate();
  const [loginUser, { data, loading, error}] = useMutation(LOGIN_USER);
  let [screen, setScreen] = useState(false);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('email and password: ', email + ' ' + password);

    try {
      const { data } = await loginUser({
        variables: { email, password }
        
      });
      //refetchQueries: [{ query: LOGGED_IN_USER }],
      console.log('data from server: ', data)
      console.log('Logged in as:', data.loginUser);
      setScreen(data.loginUser);
      setEmail('');
      setPassword('');
      console.log('screen: ', screen)
    } catch (error) {
      console.error('Login error:', error);
    }
};

  const { data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError, refetch: refetchLoggedInData } = useQuery(LOGGED_IN_USER);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await refetchLoggedInData();
        const isLoggedInVar = isLoggedInData?.isLoggedIn;
        if (isLoggedInVar !== undefined && isLoggedInVar !== screen) {
          setScreen(isLoggedInVar);
        }
      } catch (e) {
        setScreen(false);
        console.log('error: ', e);
      }
    };

    checkLoginStatus();
  }, [isLoggedInData, refetchLoggedInData, screen]);

  if (isLoggedInData?.isLoggedIn === true) {
    console.log('user is logged in');
    console.log('screen: ', screen);
  }

  return (
    <Container className="entryform">
      <Row className="justify-content-center">
        <Col xs={10} md={6}>
          {screen !== false ? (
            <CoursesHome screen={screen} setScreen={setScreen} />
          ) : (

            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  value={email}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  value={password}
                />
              </Form.Group>
              <br></br>

              <Button size="lg" variant="success" type="submit" >
                Login
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default LoginUser;
