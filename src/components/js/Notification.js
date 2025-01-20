import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

function NotificationFeed({ userType, userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notificationPath = userType === "buddy"
      ? `users/${userId}/notifications`
      : `groups/${userId}/notifications`;

    const unsubscribe = onSnapshot(
      collection(db, notificationPath),
      (snapshot) => {
        const fetchedNotifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(fetchedNotifications);
      },
      (error) => console.error("Error fetching notifications:", error)
    );

    return () => unsubscribe();
  }, [userType, userId]);

  if (notifications.length === 0) return <p>No notifications available.</p>;

  return (
    <div className="notification-feed">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>
            <p>{notif.message}</p>
            <small>{new Date(notif.createdAt.seconds * 1000).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationFeed;
