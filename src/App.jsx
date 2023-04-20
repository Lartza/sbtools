import React from 'react';
import {
  Col, Container, Nav, Navbar, Row,
} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { useGetUpdatedQuery } from './slices/sponsortimeApiSlice';

function App() {
  const {
    data,
    isLoading,
    isSuccess,
  } = useGetUpdatedQuery();

  let updated = '';
  if (isSuccess) {
    updated = data.value;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbar>
            <Navbar.Brand as={Link} to="/">
              <img
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="SBBrowser logo"
              />
              {' '}
              SBBrowser
            </Navbar.Brand>
            <Nav>
              <Nav.Link target="_blank" href="https://sb.ltn.fi/database">Database download</Nav.Link>
              <Nav.Link target="_blank" href="https://api.sb.ltn.fi/docs">API</Nav.Link>
            </Nav>
          </Navbar>
        </Col>
        <Col className="align-self-center">
          Last update:
          {' '}
          {isLoading ? 'Loading...' : (
            <>
              {updated.slice(0, -13)}
              {' '}
              (
              <TimeAgo date={updated} />
              )
            </>
          )}
          {' '}
          All times UTC
        </Col>
      </Row>
      <Outlet />
      <Row>
        <Col>
          <span>
            <a href="https://github.com/Lartza/sbtools">SB Browser</a>
            {' '}
            © 2023
            {' '}
            <a href="https://github.com/Lartza">Lartza</a>
            , licensed under
            {' '}
            <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPLv3</a>
            . Uses SponsorBlock data licensed under
            {' '}
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>
            {' '}
            from
            {' '}
            <a href="https://sponsor.ajay.app/">https://sponsor.ajay.app/</a>
            .
          </span>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
