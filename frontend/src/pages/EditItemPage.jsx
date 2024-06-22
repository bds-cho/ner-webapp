import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useGetSession } from "../api/authentication";
import {
  useGetUserDataById,
  updateDataById,
} from "../api/database_communication.js";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function EditItemPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { data: user } = useGetSession();
  const { data: userData } = useGetUserDataById(itemId);

  const [editedText, setEditedText] = useState("");

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (newText) => updateDataById(itemId, newText),
    onSuccess: () => {
      queryClient.invalidateQueries("get_user_data");

      setTimeout(() => {
        navigate("/profile");
      }, 10);
    },
  });

  useEffect(() => {
    if (userData) {
      setEditedText(userData.text);
    }
  }, [userData]);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSaveChanges = () => {
    updateMutation.mutate(editedText);
  };

  return (
    <Card
      style={{
        width: "100%",
        margin: "auto",
        maxWidth: "600px",
        marginTop: "20px",
      }}
    >
      <Card.Body>
        <Card.Title>
          <h3>Edit data:</h3>
        </Card.Title>

        <Form>
          <Form.Group controlId="formEditItem">
            <Form.Control
              as="textarea"
              rows={3}
              value={editedText}
              onChange={handleTextChange}
            />
          </Form.Group>
        </Form>
        <br />
        <Button variant="primary" onClick={handleSaveChanges}>
          Change
        </Button>
      </Card.Body>
    </Card>
  );
}

export default EditItemPage;
