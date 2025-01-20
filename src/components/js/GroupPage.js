import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig"; // Import Firebase config
import "../css/GroupPage.css";

function GroupPage() {
  const { groupId } = useParams(); // Extract group ID from URL
  const [groupDetails, setGroupDetails] = useState(null);
  const [members, setMembers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!groupId) {
      console.error("Group ID is missing!");
      return;
    }

    // Fetch group details
    const fetchGroupDetails = async () => {
      try {
        const groupDoc = await getDoc(doc(db, "groups", groupId));
        if (groupDoc.exists()) {
          setGroupDetails(groupDoc.data());
        } else {
          console.error("Group not found!");
        }
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();

    // Real-time updates for members
    const unsubscribeMembers = onSnapshot(
      collection(db, `groups/${groupId}/members`),
      (snapshot) => {
        setMembers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      },
      (error) => console.error("Error fetching members:", error)
    );

    // Real-time updates for join requests
    const unsubscribeRequests = onSnapshot(
      collection(db, `groups/${groupId}/requests`),
      (snapshot) => {
        setRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      },
      (error) => console.error("Error fetching requests:", error)
    );

    // Real-time updates for chat messages
    const unsubscribeMessages = onSnapshot(
      collection(db, `groups/${groupId}/messages`),
      (snapshot) => {
        const sortedMessages = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds); // Sort messages by time
        setMessages(sortedMessages);
      },
      (error) => console.error("Error fetching messages:", error)
    );

    // Real-time updates for notifications
    const unsubscribeNotifications = onSnapshot(
      collection(db, `groups/${groupId}/notifications`),
      (snapshot) => {
        setNotifications(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      },
      (error) => console.error("Error fetching notifications:", error)
    );

    return () => {
      unsubscribeMembers();
      unsubscribeRequests();
      unsubscribeMessages();
      unsubscribeNotifications();
    };
  }, [groupId]);

  // Handle message sending
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await addDoc(collection(db, `groups/${groupId}/messages`), {
        text: newMessage,
        createdAt: serverTimestamp(),
        sender: "John Doe", // Replace with authenticated user info
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle request approval
  const handleApproveRequest = async (requestId, user) => {
    try {
      // Add user to members collection
      await addDoc(collection(db, `groups/${groupId}/members`), user);

      // Delete the join request
      await deleteDoc(doc(db, `groups/${groupId}/requests`, requestId));

      // Add a notification
      await addDoc(collection(db, `groups/${groupId}/notifications`), {
        message: `${user.name} has joined the group!`,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Handle request rejection
  const handleRejectRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, `groups/${groupId}/requests`, requestId));

      // Add a notification
      await addDoc(collection(db, `groups/${groupId}/notifications`), {
        message: `A join request was rejected.`,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="group-page-container">
      {/* Group Details */}
      {groupDetails && (
        <>
          <h1>{groupDetails.name}</h1>
          <p>Activity: {groupDetails.activityType}</p>
          <p>Location: {groupDetails.location}</p>
          <p>Schedule: {groupDetails.schedule}</p>
          <p>Description: {groupDetails.description}</p>
          <p>Organizer: {groupDetails.organizerName} (Contact: {groupDetails.organizerContact})</p>
        </>
      )}

      {/* Notifications */}
      <div className="notifications-section">
        <h3>Notifications</h3>
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id}>{notif.message}</li>
          ))}
        </ul>
      </div>

      {/* Join Requests */}
      <div className="requests-section">
        <h3>Join Requests</h3>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="request-item">
              <p>
                <strong>{request.name}</strong> wants to join the group.
              </p>
              <button
                onClick={() =>
                  handleApproveRequest(request.id, { id: request.userId, name: request.name })
                }
              >
                Approve
              </button>
              <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
            </div>
          ))
        ) : (
          <p>No join requests at the moment.</p>
        )}
      </div>

      {/* Group Members */}
      <div className="members-section">
        <h3>Group Members</h3>
        {members.map((member) => (
          <p key={member.id}>{member.name}</p>
        ))}
      </div>

      {/* Group Chat */}
      <div className="chat-section">
        <h3>Group Chat</h3>
        <div className="messages-container">
          {messages.map((msg) => (
            <p key={msg.id}>
              <strong>{msg.sender}: </strong>
              {msg.text}
            </p>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="button1" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
