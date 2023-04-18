import React from 'react';
import {
  Col, Container, Nav, Navbar, Row,
} from 'react-bootstrap';
import SponsortimeTable from './components/SponsortimeTable';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbar>
            <Navbar.Brand href="/">SBBrowser</Navbar.Brand>
            <Nav>
              <Nav.Link target="_blank" href="https://sb.ltn.fi/database">Database download</Nav.Link>
              <Nav.Link target="_blank" href="https://api.sb.ltn.fi/docs">API</Nav.Link>
            </Nav>
          </Navbar>
        </Col>
        <Col>
          Last update: TODO, check last segment time for now. All times UTC
        </Col>
      </Row>
      <SponsortimeTable />
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
