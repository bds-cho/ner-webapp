import React from "react";
import { Container, Card } from "react-bootstrap";
import { useGetPublicDataAll } from "../api/database_communication.js";
import FeedTextItem from "../components/FeedTextItem.jsx";

function UserFeedPage() {
  const { data: allPublicData } = useGetPublicDataAll();

  return (
    <Container>
      <h1 className="mt-4 mb-4">User Feed Page</h1>
      <div className="feed">
        {allPublicData && allPublicData.length > 0 ? (
          allPublicData.map((item, index) => (
            <FeedTextItem
              key={index}
              user={item.user}
              text={item.text}
            ></FeedTextItem>
          ))
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </Container>
  );
}

export default UserFeedPage;
