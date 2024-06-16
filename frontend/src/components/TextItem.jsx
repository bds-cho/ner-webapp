import React from "react";
import { Badge, Card, Col, Row, Button } from "react-bootstrap";
import "../styles/TextItem.css";
import "../styles/DeleteButton.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TextItem = ({ key, text, is_public, onDelete }) => {
  return (
    <Card className="mb-3 text-item-card">
      <Card.Body>
        <Row>
          <Col xs="auto">
            <Badge bg={is_public ? "success" : "danger"}>
              {is_public ? "Public" : "Private"}
            </Badge>
          </Col>
          <Col className="text-center">
            <Card.Text>{text}</Card.Text>
          </Col>
          <Col xs="auto">
            <button class="delete-button" onClick={onDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TextItem;
