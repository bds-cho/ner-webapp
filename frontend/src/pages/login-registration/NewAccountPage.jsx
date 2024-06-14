import React, { useState } from "react";
import { Form, Button, Card, Stack } from "react-bootstrap";
import { registerUser } from "../../api/authentication";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function NewAccountPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      navigate("/login");
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      registerUserMutation.mutate({ name, surname, email, password });
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
      }}
    >
      <h2 className="text-center">Sign Up</h2>
      <Form onSubmit={handleSignup} style={{ textAlign: "left" }}>
        <Stack gap="2">
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-4">
            Sign Up
          </Button>
          {registerUserMutation.isError && (
            <Alert variant="danger">{registerUserMutation.error.message}</Alert>
          )}
        </Stack>
      </Form>
    </Card>
  );
}

export default NewAccountPage;
