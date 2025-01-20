import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import "../css/Dashboard.css";

function GroupOrganizerDashboard() {
  const [filters, setFilters] = useState({
    proximity: "",
    availability: "",
  });

  const [groups, setGroups] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newGroup, setNewGroup] = useState({
    name: "",
    activityType: "",
    schedule: "",
    location: "",
  });

  const [editingGroup, setEditingGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Real-time listener for groups
  useEffect(() => {
    setLoading(true);
    const unsubscribeGroups = onSnapshot(
      query(collection(db, "groups"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      }
    );

    return () => unsubscribeGroups();
  }, []);

  // Real-time listener for requests (specific group)
  useEffect(() => {
    if (!selectedGroup) return;

    const groupRequestsQuery = query(
      collection(db, "requests"),
      where("groupId", "==", selectedGroup.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribeRequests = onSnapshot(groupRequestsQuery, (snapshot) => {
      setGroupRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribeRequests();
  }, [selectedGroup]);

  // Real-time listener for notifications
  useEffect(() => {
    const notificationsQuery = query(
      collection(db, "notifications"),
      orderBy("timestamp", "desc")
    );

    const unsubscribeNotifications = onSnapshot(notificationsQuery, (snapshot) => {
      setNotifications(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribeNotifications();
  }, []);

  // Add a new group
  const handleAddGroup = async () => {
    if (!newGroup.name || !newGroup.activityType || !newGroup.schedule || !newGroup.location) {
      alert("Please fill out all fields for the new group.");
      return;
    }

    try {
      await addDoc(collection(db, "groups"), {
        ...newGroup,
        createdAt: serverTimestamp(),
      });
      alert("Group added successfully!");
      setNewGroup({ name: "", activityType: "", schedule: "", location: "" });
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  // Edit an existing group
  const handleEditGroup = (group) => {
    setEditingGroup(group);
  };

  const handleSaveEditGroup = async () => {
    if (!editingGroup) return;

    try {
      const groupDocRef = doc(db, "groups", editingGroup.id);
      await updateDoc(groupDocRef, {
        name: editingGroup.name,
        activityType: editingGroup.activityType,
        schedule: editingGroup.schedule,
        location: editingGroup.location,
      });
      alert("Group updated successfully!");
      setEditingGroup(null);
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  // Delete a group with confirmation
  const handleDeleteGroup = async (groupId) => {
    const confirmation = window.confirm("Are you sure you want to delete this group?");
    if (!confirmation) return;

    try {
      const groupDocRef = doc(db, "groups", groupId);
      await deleteDoc(groupDocRef);

      // Optionally delete associated requests
      const associatedRequests = query(
        collection(db, "requests"),
        where("groupId", "==", groupId)
      );
      const requestsSnapshot = await getDocs(associatedRequests);
      requestsSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      alert("Group and associated requests deleted successfully!");
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  // View requests for a specific group
  const handleViewRequests = (group) => {
    setSelectedGroup(group);
  };

  // Approve a request
  const handleApproveRequest = async (requestId) => {
    try {
      const requestDocRef = doc(db, "requests", requestId);
      await updateDoc(requestDocRef, { status: "Approved" });

      // Notify user
      await addDoc(collection(db, "notifications"), {
        message: `Your request for group "${selectedGroup.name}" has been approved.`,
        timestamp: serverTimestamp(),
      });

      alert("Request approved successfully!");
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Decline a request
  const handleDeclineRequest = async (requestId) => {
    try {
      const requestDocRef = doc(db, "requests", requestId);
      await updateDoc(requestDocRef, { status: "Declined" });

      // Notify user
      await addDoc(collection(db, "notifications"), {
        message: `Your request for group "${selectedGroup.name}" has been declined.`,
        timestamp: serverTimestamp(),
      });

      alert("Request declined successfully!");
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  // Notification bell click
  const handleNotificationsClick = () => {
    alert("Notifications: \n" + notifications.map((n) => n.message).join("\n"));
  };

  return (
    <div className="dashboard-container">
      <h1>Group Organizer Dashboard</h1>

      {/* Notification Bell */}
      <div className="notification-icon" onClick={handleNotificationsClick}>
        🔔 {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </div>

      {/* Filters Section */}
      <div className="filters-container">
        <h3>Filters</h3>
        <input
          type="text"
          placeholder="Proximity (e.g., within 5 km)"
          value={filters.proximity}
          onChange={(e) => setFilters({ ...filters, proximity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Availability (e.g., mornings)"
          value={filters.availability}
          onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
        />
        <button className="primary-btn">Search</button>
      </div>

      {/* Add New Group Section */}
      <div className="add-group-container">
        <h3>Create New Group</h3>
        <input
          type="text"
          placeholder="Group Name"
          value={newGroup.name}
          onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Activity Type"
          value={newGroup.activityType}
          onChange={(e) => setNewGroup({ ...newGroup, activityType: e.target.value })}
        />
        <input
          type="text"
          placeholder="Schedule (e.g., Mondays 10 AM)"
          value={newGroup.schedule}
          onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newGroup.location}
          onChange={(e) => setNewGroup({ ...newGroup, location: e.target.value })}
        />
        <button className="primary-btn" onClick={handleAddGroup}>
          Add Group
        </button>
      </div>

      {/* Groups Section */}
      <div className="results-container">
        <h3>Your Groups</h3>
        {loading ? (
          <p>Loading...</p>
        ) : groups.length > 0 ? (
          groups.map((group) => (
            <div key={group.id} className="result-item">
              <h4>{group.name}</h4>
              <p>Activity: {group.activityType}</p>
              <p>Schedule: {group.schedule}</p>
              <p>Location: {group.location}</p>
              <button className="secondary-btn"  onClick={() => handleEditGroup(group)}>Edit</button>
              <button className="secondary-btn cancel"  onClick={() => handleDeleteGroup(group.id)}>Delete</button>
              <button className="secondary-btn view-requests"  onClick={() => handleViewRequests(group)}>View Requests</button>
            </div>
          ))
        ) : (
          <p>No groups found.</p>
        )}
      </div>

      {/* Requests Section */}
      {selectedGroup && (
        <div className="requests-container">
          <h3>Join Requests for {selectedGroup.name}</h3>
          {groupRequests.length > 0 ? (
            groupRequests.map((request) => (
              <div key={request.id} className="request-item">
                <p>User: {request.userName}</p>
                <p>Reason: {request.reason}</p>
                <button className="secondary-btn"  onClick={() => handleApproveRequest(request.id)}>Approve</button>
                <button className="secondary-btn"  onClick={() => handleDeclineRequest(request.id)}>Decline</button>
              </div>
            ))
          ) : (
            <p>No requests for this group.</p>
          )}
        </div>
      )}

      {/* Edit Group Modal */}
      {editingGroup && (
        <div className="modal">
          <h3>Edit Group</h3>
          <input
            type="text"
            value={editingGroup.name}
            onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
          />
          <input
            type="text"
            value={editingGroup.activityType}
            onChange={(e) => setEditingGroup({ ...editingGroup, activityType: e.target.value })}
          />
          <input
            type="text"
            value={editingGroup.schedule}
            onChange={(e) => setEditingGroup({ ...editingGroup, schedule: e.target.value })}
          />
          <input
            type="text"
            value={editingGroup.location}
            onChange={(e) => setEditingGroup({ ...editingGroup, location: e.target.value })}
          />
          <button className="secondary-btn"  onClick={handleSaveEditGroup}>Save</button>
          <button className="secondary-btn"  onClick={() => setEditingGroup(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default GroupOrganizerDashboard;

