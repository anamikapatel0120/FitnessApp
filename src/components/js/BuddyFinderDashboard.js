// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   updateDoc,
//   doc,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "./firebaseConfig"; // Import Firebase config
// import "../css/Dashboard.css";

// function BuddyFinderDashboard() {
//   const [filters, setFilters] = useState({
//     activityType: "",
//     skillLevel: "",
//     location: "",
//   });

//   const [buddies, setBuddies] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Load initial buddies and groups (unfiltered)
//     const unsubscribeBuddies = onSnapshot(
//       collection(db, "buddies"),
//       (snapshot) => {
//         setBuddies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       }
//     );

//     const unsubscribeGroups = onSnapshot(
//       collection(db, "groups"),
//       (snapshot) => {
//         setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       }
//     );

//     return () => {
//       unsubscribeBuddies();
//       unsubscribeGroups();
//     };
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   const handleSearch = () => {
//     setLoading(true);

//     const buddiesQuery = query(
//       collection(db, "buddies"),
//       where("activityType", "==", filters.activityType || ""),
//       where("skillLevel", "==", filters.skillLevel || ""),
//       where("location", "==", filters.location || "")
//     );

//     onSnapshot(buddiesQuery, (snapshot) => {
//       setBuddies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     });

//     const groupsQuery = query(
//       collection(db, "groups"),
//       where("activityType", "==", filters.activityType || ""),
//       where("location", "==", filters.location || "")
//     );

//     onSnapshot(groupsQuery, (snapshot) => {
//       setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     });

//     setLoading(false);
//   };

//   const handleAddBuddy = async () => {
//     const newBuddy = {
//       name: "New User",
//       activityType: filters.activityType || "Default Activity",
//       skillLevel: filters.skillLevel || "Beginner",
//       location: filters.location || "Unknown",
//       createdAt: serverTimestamp(),
//     };

//     try {
//       await addDoc(collection(db, "buddies"), newBuddy);
//       alert("New buddy added successfully!");
//     } catch (error) {
//       console.error("Error adding buddy:", error);
//     }
//   };

//   const handleAddToBuddies = async (buddyId) => {
//     try {
//       const buddyRef = doc(db, "buddies", buddyId);
//       await updateDoc(buddyRef, { status: "added" });
//       alert("Buddy added successfully!");
//     } catch (error) {
//       console.error("Error adding buddy:", error);
//     }
//   };

//   const handleSendRequest = async (groupId) => {
//     const newRequest = {
//       groupId,
//       userName: "John Doe", // Replace with the actual user's name
//       message: "Hi, I'd like to join this group!", // Customizable message
//       createdAt: serverTimestamp(),
//       status: "pending",
//       userId: "user_123", // Replace with the actual user ID
//     };

//     try {
//       await addDoc(collection(db, "requests"), newRequest);
//       alert("Request sent successfully!");
//     } catch (error) {
//       console.error("Error sending request:", error);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Buddy Finder Dashboard</h1>

//       {/* Filters Section */}
//       <div className="filters-container">
//         <h3>Filters</h3>
//         <input
//           type="text"
//           name="activityType"
//           placeholder="Activity Type (e.g., Gym, Yoga)"
//           value={filters.activityType}
//           onChange={handleFilterChange}
//         />
//         <input
//           type="text"
//           name="skillLevel"
//           placeholder="Skill Level (e.g., Beginner, Intermediate)"
//           value={filters.skillLevel}
//           onChange={handleFilterChange}
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={filters.location}
//           onChange={handleFilterChange}
//         />
//         <button className="primary-btn" onClick={handleSearch}>
//           Search Buddies
//         </button>
//         <button className="secondary-btn" onClick={handleAddBuddy}>
//           Add New Buddy
//         </button>
//       </div>

//       {/* Results Section */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="results-container">
//             <h3>Recommended Buddies</h3>
//             {buddies.length > 0 ? (
//               buddies.map((buddy) => (
//                 <div key={buddy.id} className="result-item">
//                   <h4>{buddy.name}</h4>
//                   <p>Activity: {buddy.activityType}</p>
//                   <p>Skill Level: {buddy.skillLevel}</p>
//                   <p>Location: {buddy.location}</p>
//                   <button onClick={() => handleAddToBuddies(buddy.id)}>
//                     Add Buddy
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No buddies found. Adjust your filters!</p>
//             )}
//           </div>

//           <div className="results-container">
//             <h3>Available Fitness Groups</h3>
//             {groups.length > 0 ? (
//               groups.map((group) => (
//                 <div key={group.id} className="result-item">
//                   <h4>{group.name}</h4>
//                   <p>Activity: {group.activityType}</p>
//                   <p>Location: {group.location}</p>
//                   <button onClick={() => handleSendRequest(group.id)}>
//                     Send Request
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No fitness groups found. Adjust your filters!</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default BuddyFinderDashboard;











// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   updateDoc,
//   doc,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "./firebaseConfig"; // Import Firebase config
// import "../css/Dashboard.css";

// function BuddyFinderDashboard() {
//   const [filters, setFilters] = useState({
//     activityType: "",
//     skillLevel: "",
//     location: "",
//   });

//   const [buddies, setBuddies] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Real-time update of buddies and groups
//     const unsubscribeBuddies = onSnapshot(
//       collection(db, "buddies"),
//       (snapshot) => {
//         setBuddies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       }
//     );

//     const unsubscribeGroups = onSnapshot(
//       collection(db, "groups"),
//       (snapshot) => {
//         setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       }
//     );

//     return () => {
//       unsubscribeBuddies();
//       unsubscribeGroups();
//     };
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   const handleSearch = () => {
//     setLoading(true);

//     const buddiesQuery = query(
//       collection(db, "buddies"),
//       ...(filters.activityType ? [where("activityType", "==", filters.activityType)] : []),
//       ...(filters.skillLevel ? [where("skillLevel", "==", filters.skillLevel)] : []),
//       ...(filters.location ? [where("location", "==", filters.location)] : [])
//     );

//     onSnapshot(buddiesQuery, (snapshot) => {
//       setBuddies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     });

//     const groupsQuery = query(
//       collection(db, "groups"),
//       ...(filters.activityType ? [where("activityType", "==", filters.activityType)] : []),
//       ...(filters.location ? [where("location", "==", filters.location)] : [])
//     );

//     onSnapshot(groupsQuery, (snapshot) => {
//       setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     });

//     setLoading(false);
//   };

//   const handleSendRequest = async (groupId) => {
//     const newRequest = {
//       groupId,
//       userName: "John Doe", // Replace with dynamic user name
//       message: "Hi, I'd like to join this group!",
//       createdAt: serverTimestamp(),
//       status: "pending",
//       userId: "user_123", // Replace with dynamic user ID
//     };

//     try {
//       await addDoc(collection(db, "requests"), newRequest);
//       alert("Request sent successfully!");
//     } catch (error) {
//       console.error("Error sending request:", error);
//     }
//   };

//   const handleAddBuddy = async (buddyId) => {
//     try {
//       const buddyRef = doc(db, "buddies", buddyId);
//       await updateDoc(buddyRef, { status: "added" });
//       alert("Buddy added successfully!");
//     } catch (error) {
//       console.error("Error adding buddy:", error);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Buddy Finder Dashboard</h1>

//       {/* Filters Section */}
//       <div className="filters-container">
//         <h3>Filters</h3>
//         <input
//           type="text"
//           name="activityType"
//           placeholder="Activity Type (e.g., Gym, Yoga)"
//           value={filters.activityType}
//           onChange={handleFilterChange}
//         />
//         <input
//           type="text"
//           name="skillLevel"
//           placeholder="Skill Level (e.g., Beginner, Intermediate)"
//           value={filters.skillLevel}
//           onChange={handleFilterChange}
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={filters.location}
//           onChange={handleFilterChange}
//         />
//         <button className="primary-btn" onClick={handleSearch}>
//           Search
//         </button>
//       </div>

//       {/* Results Section */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="results-container">
//             <h3>Recommended Buddies</h3>
//             {buddies.length > 0 ? (
//               buddies.map((buddy) => (
//                 <div key={buddy.id} className="result-item">
//                   <h4>{buddy.name}</h4>
//                   <p>Activity: {buddy.activityType}</p>
//                   <p>Skill Level: {buddy.skillLevel}</p>
//                   <p>Location: {buddy.location}</p>
//                   <button onClick={() => handleAddBuddy(buddy.id)}>
//                     Add Buddy
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No buddies found. Adjust your filters!</p>
//             )}
//           </div>

//           <div className="results-container">
//             <h3>Available Fitness Groups</h3>
//             {groups.length > 0 ? (
//               groups.map((group) => (
//                 <div key={group.id} className="result-item">
//                   <h4>{group.name}</h4>
//                   <p>Activity: {group.activityType}</p>
//                   <p>Location: {group.location}</p>
//                   <button onClick={() => handleSendRequest(group.id)}>
//                     Send Request
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No fitness groups found. Adjust your filters!</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default BuddyFinderDashboard;








import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig"; // Import Firebase config
import "../css/Dashboard.css";

function BuddyFinderDashboard() {
  const navigate = useNavigate(); // For navigation to group or profile pages
  const [filters, setFilters] = useState({
    activityType: "",
    skillLevel: "",
    location: "",
  });

  const [buddies, setBuddies] = useState([]);
  const [addedBuddies, setAddedBuddies] = useState([]); // To store added buddies
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Real-time update of buddies and groups
    const unsubscribeBuddies = onSnapshot(
      collection(db, "buddies"),
      (snapshot) => {
        setBuddies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    const unsubscribeGroups = onSnapshot(
      collection(db, "groups"),
      (snapshot) => {
        setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    return () => {
      unsubscribeBuddies();
      unsubscribeGroups();
    };
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    setLoading(true);

    // Filter buddies based on filters
    const buddiesQuery = query(
      collection(db, "buddies"),
      ...(filters.activityType ? [where("activityType", "==", filters.activityType)] : []),
      ...(filters.skillLevel ? [where("skillLevel", "==", filters.skillLevel)] : []),
      ...(filters.location ? [where("location", "==", filters.location)] : [])
    );

    onSnapshot(buddiesQuery, (snapshot) => {
      setBuddies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Filter groups based on filters
    const groupsQuery = query(
      collection(db, "groups"),
      ...(filters.activityType ? [where("activityType", "==", filters.activityType)] : []),
      ...(filters.location ? [where("location", "==", filters.location)] : [])
    );

    onSnapshot(groupsQuery, (snapshot) => {
      setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    setLoading(false);
  };

  const handleAddBuddy = (buddy) => {
    setAddedBuddies((prevAddedBuddies) => [...prevAddedBuddies, buddy]);
  };

  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`); // Redirect to group page with the group ID
  };

  const handleViewBuddyProfile = (buddyId) => {
    navigate(`/buddy/${buddyId}`); // Redirect to buddy profile page with buddy ID
  };

  return (
    <div className="dashboard-container">
      <h1>Buddy Finder Dashboard</h1>

      {/* Filters Section */}
      <div className="filters-container">
        <h3>Filters</h3>
        <input
          type="text"
          name="activityType"
          placeholder="Activity Type (e.g., Gym, Yoga)"
          value={filters.activityType}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="skillLevel"
          placeholder="Skill Level (e.g., Beginner, Intermediate)"
          value={filters.skillLevel}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <button className="primary-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Results Section */}
          <div className="results-container">
            <h3>Available Fitness Groups</h3>
            {groups.length > 0 ? (
              groups.map((group) => (
                <div key={group.id} className="result-item">
                  <h4>{group.name}</h4>
                  <p>Activity: {group.activityType}</p>
                  <p>Location: {group.location}</p>
                  <button className="secondary-btn" onClick={() => handleGroupClick(group.id)}>
                    View Group
                  </button>
                </div>
              ))
            ) : (
              <p>No fitness groups found. Adjust your filters!</p>
            )}
          </div>

          {/* Recommended Buddies Section */}
          <div className="results-container">
            <h3>Recommended Buddies</h3>
            {buddies.length > 0 ? (
              buddies.map((buddy) => (
                <div key={buddy.id} className="result-item">
                  <h4>{buddy.name}</h4>
                  <p>Activity: {buddy.activityType}</p>
                  <p>Location: {buddy.location}</p>
                  <button className="secondary-btn" onClick={() => handleAddBuddy(buddy)}>
                    Add Buddy
                  </button>
                  <button className="secondary-btn" onClick={() => handleViewBuddyProfile(buddy.id)}>
                    View Profile
                  </button>
                </div>
              ))
            ) : (
              <p>No buddies found. Adjust your filters!</p>
            )}
          </div>

          {/* Added Buddies Section */}
          <div className="results-container">
            <h3>Added Buddies</h3>
            {addedBuddies.length > 0 ? (
              addedBuddies.map((buddy) => (
                <div key={buddy.id} className="result-item">
                  <h4>{buddy.name}</h4>
                  <p>Activity: {buddy.activityType}</p>
                  <p>Location: {buddy.location}</p>
                </div>
              ))
            ) : (
              <p>You haven't added any buddies yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default BuddyFinderDashboard;
