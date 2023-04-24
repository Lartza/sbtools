import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function FrontpageNavigation() {
  const navigate = useNavigate();
  const videoid = useRef();
  const username = useRef();
  const userid = useRef();
  const uuid = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    switch (event.target.id) {
      case 'videoid':
        if (videoid.current.value) {
          navigate(`/video/${videoid.current.value}`);
        }
        break;
      case 'username':
        if (username.current.value) {
          navigate(`/username/${username.current.value}`);
        }
        break;
      case 'userid':
        if (userid.current.value) {
          navigate(`/userid/${userid.current.value}`);
        }
        break;
      case 'uuid':
        if (uuid.current.value) {
          navigate(`/uuid/${uuid.current.value}`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Row>
      <Col>
        <Form onSubmit={handleSubmit} id="videoid">
          <Form.Label>VideoID</Form.Label>
          <Form.Control className="mb-2" type="text" placeholder="VideoID" ref={videoid} />
          <Button type="submit">Go</Button>
        </Form>
      </Col>
      <Col>
        <Form onSubmit={handleSubmit} id="username">
          <Form.Label>Username</Form.Label>
          <Form.Control className="mb-2" type="text" placeholder="Username" ref={username} />
          <Button type="submit">Go</Button>
        </Form>
      </Col>
      <Col>
        <Form onSubmit={handleSubmit} id="userid">
          <Form.Label>UserID</Form.Label>
          <Form.Control className="mb-2" type="text" placeholder="UserID" ref={userid} />
          <Button type="submit">Go</Button>
        </Form>
      </Col>
      <Col>
        <Form onSubmit={handleSubmit} id="uuid">
          <Form.Label>UUID</Form.Label>
          <Form.Control className="mb-2" type="text" placeholder="UserID" ref={uuid} />
          <Button type="submit">Go</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default FrontpageNavigation;
