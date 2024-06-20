import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { addUserData } from "../api/database_communication.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function TextAnalysePage() {
  const [text, setText] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const qc = useQueryClient();

  const addUserDataMutation = useMutation({
    mutationFn: addUserData,
    onSuccess: (data) => {
      console.log("Data added successfully", data);
      qc.invalidateQueries("get_user_data");
      // TODO: add page for single result
      navigate("/profile");
    },
  });

  // Handle text area input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    if ((text && fileContent) || (!text && !fileContent)) {
      setErrorMessage(
        text && fileContent
          ? "Entweder Text eingeben oder Datei hochladen, nicht beides"
          : "Geben Sie das Text ein oder laden Sie eine Datei hoch"
      );
      return;
    }
  
    setErrorMessage(""); // Clear any previous error message
    const content = text || fileContent;
    addUserDataMutation.mutate({ text: content, is_public: isPublic });
  };  

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "750px",
        margin: "2rem auto",
        padding: "2rem",
      }}
    >
      <h1>Text Analyse</h1>
      <p>Geben Sie hier Ihren Text ein oder laden Sie eine Datei hoch.</p>
      <Container style={{ textAlign: "left" }}>
        <Form>
          <Form.Group controlId="formTextarea">
            <Form.Label>Geben Sie hier Ihren Text ein</Form.Label>
            <Form.Control
              as="textarea"
              value={text}
              onChange={handleTextChange}
              placeholder="An einem warmen Sommertag..."
              rows={10}
              cols={50}
            />
          </Form.Group>
          <Form.Group controlId="formFileUpload" className="mt-3">
            <Form.Label>Datei hochladen</Form.Label>
            <Form.Control
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              lang="de"
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="publicSwitch">
            <Form.Switch
              name="public"
              label="Öffentlich machen"
              checked={isPublic}
              onChange={() => {
                setIsPublic((prev) => !prev);
              }}
            />
          </Form.Group>
        </Form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Container>
      <br />
      <Button
        className="mt-3"
        variant="primary"
        onClick={handleSubmit}
        disabled={addUserDataMutation.isPending}
      >
        Analysieren
      </Button>
    </Card>
  );
}

export default TextAnalysePage;
