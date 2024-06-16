import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import "../styles/TextItem.css";

const TextItem = ({ text, is_public }) => {
  return (
    <Card className="mb-3 text-item-card">
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>{text}</Card.Text>
          </Col>
          <Col xs="auto">
            <Badge bg={is_public ? "success" : "danger"}>
              {is_public ? "Public" : "Private"}
            </Badge>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TextItem;
