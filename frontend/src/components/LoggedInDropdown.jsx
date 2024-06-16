import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/LoggedInDropdown.css";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logoutUser } from "../api/authentication";

const LoggedInDropdown = ({ email }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      navigate("/");
    },
  });

  const handleProfileClick = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Eingeloggt als {email}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleProfileClick}>Mein Profil</Dropdown.Item>
        <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LoggedInDropdown;
