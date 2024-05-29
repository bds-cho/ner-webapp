import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <Container>
                <Row>
                    <Col className="text-center">
                        <span className="text-muted">Adresse: Ackerstr. 76,13355 Berlin <br/> Inahber : <br/>  Alle Rechte vorbehalten.</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;