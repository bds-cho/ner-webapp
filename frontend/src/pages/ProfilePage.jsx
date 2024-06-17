import React from "react";
import { Card } from "react-bootstrap";
import { useGetSession } from "../api/authentication";
import {
  deleteUserData,
  useGetUserDataAll,
} from "../api/database_communication.js";
import TextItem from "../components/TextItem.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { data: user } = useGetSession();
  const { data: userDataAll } = useGetUserDataAll();

  const navigate = useNavigate();
  const qc = useQueryClient();

  const deleteUserDataMutation = useMutation({
    mutationFn: deleteUserData,
    onSuccess: (data) => {
      // console.log("Text deleted successfully", data);
      qc.invalidateQueries("delete_user_data");
      navigate("/profile");
    },
  });

  const handleDelete = async (itemid) => {
    deleteUserDataMutation.mutate(itemid);
  };

  const handleEdit = (itemid) => {
    navigate("/edit-item/" + itemid);
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
          <h3>
            {user.first_name} {user.last_name}
          </h3>
          <h6>{user.username}</h6>
        </Card.Title>

        <div>
          <h5>All data:</h5>
          {userDataAll && userDataAll.length > 0 ? (
            userDataAll.map((item) => (
              <TextItem
                key={item.id}
                text={item.text}
                is_public={item.is_public}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEdit(item.id)}
              />
            ))
          ) : (
            <p>No user data available</p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Profile;
