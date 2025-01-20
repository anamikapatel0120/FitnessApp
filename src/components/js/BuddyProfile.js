import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Firebase config file

function BuddyProfile({ userId }) {
  const [buddyProfile, setBuddyProfile] = useState(null);

  useEffect(() => {
    const fetchBuddyProfile = async () => {
      try {
        const buddyDoc = await getDoc(doc(db, "users", userId));
        if (buddyDoc.exists()) {
          setBuddyProfile(buddyDoc.data());
        } else {
          console.error("Buddy not found!");
        }
      } catch (error) {
        console.error("Error fetching buddy profile:", error);
      }
    };

    fetchBuddyProfile();
  }, [userId]);

  if (!buddyProfile) return <p>Loading...</p>;

  return (
    <div className="buddy-profile">
      <img
        src={buddyProfile.profilePicture || "/default-avatar.png"}
        alt={`${buddyProfile.name}'s Profile`}
        className="profile-picture"
      />
      <h2>{buddyProfile.name}</h2>
      <p><strong>About:</strong> {buddyProfile.about}</p>
      <p><strong>Fitness Goals:</strong> {buddyProfile.fitnessGoals}</p>
      <p><strong>Fitness History:</strong> {buddyProfile.fitnessHistory || "No history available"}</p>
      {buddyProfile.contactVisible && (
        <>
          <p><strong>Phone:</strong> {buddyProfile.phone}</p>
          <p><strong>Email:</strong> {buddyProfile.email}</p>
        </>
      )}
    </div>
  );
}

export default BuddyProfile;






// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "./firebaseConfig";

// function BuddyProfile() {
//   const { buddyId } = useParams(); // Get buddy ID from URL
//   const [buddy, setBuddy] = useState(null);

//   useEffect(() => {
//     const fetchBuddy = async () => {
//       const buddyDoc = await getDoc(doc(db, "buddies", buddyId));
//       if (buddyDoc.exists()) {
//         setBuddy(buddyDoc.data());
//       } else {
//         console.error("Buddy not found!");
//       }
//     };
//     fetchBuddy();
//   }, [buddyId]);

//   if (!buddy) {
//     return <p>Loading buddy profile...</p>;
//   }

//   return (
//     <div className="buddy-profile">
//       <h1>{buddy.name}'s Profile</h1>
//       <img src={buddy.profilePicture || "/default-profile.png"} alt={buddy.name} />
//       <p><strong>Activity:</strong> {buddy.activityType}</p>
//       <p><strong>Skill Level:</strong> {buddy.skillLevel}</p>
//       <p><strong>Location:</strong> {buddy.location}</p>
//       <p><strong>About:</strong> {buddy.about || "No description provided."}</p>
//     </div>
//   );
// }

// export default BuddyProfile;
