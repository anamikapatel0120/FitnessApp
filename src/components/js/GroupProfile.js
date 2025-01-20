import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

function GroupProfile({ groupId }) {
  const [groupProfile, setGroupProfile] = useState(null);

  useEffect(() => {
    const fetchGroupProfile = async () => {
      try {
        const groupDoc = await getDoc(doc(db, "groups", groupId));
        if (groupDoc.exists()) {
          setGroupProfile(groupDoc.data());
        } else {
          console.error("Group not found!");
        }
      } catch (error) {
        console.error("Error fetching group profile:", error);
      }
    };

    fetchGroupProfile();
  }, [groupId]);

  if (!groupProfile) return <p>Loading...</p>;

  return (
    <div className="group-profile">
      <img
        src={groupProfile.profilePicture || "/default-group-avatar.png"}
        alt={`${groupProfile.name}'s Profile`}
        className="group-picture"
      />
      <h2>{groupProfile.name}</h2>
      <p><strong>Activity Type:</strong> {groupProfile.activityType}</p>
      <p><strong>Goals:</strong> {groupProfile.goals}</p>
      <p><strong>Location:</strong> {groupProfile.location}</p>
      <p><strong>Schedule:</strong> {groupProfile.schedule}</p>
      <p><strong>Organizer:</strong> {groupProfile.organizerName}</p>
      {groupProfile.contactVisible && (
        <>
          <p><strong>Phone:</strong> {groupProfile.organizerPhone}</p>
          <p><strong>Email:</strong> {groupProfile.organizerEmail}</p>
        </>
      )}
    </div>
  );
}

export default GroupProfile;
