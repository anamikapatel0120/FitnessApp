// import React from 'react';
// import '../css/HomePage.css';

// function HomePage() {
//   return (
//     <div className="home-container">
//       <header className="hero">
//         <h1>Welcome to Buddy Finder</h1>
//         <p>Find your group, connect with friends, and make lasting connections.</p>
//         <a href="/Login" className="cta-button">Get Started</a>
//       </header>
//     </div>
//   );
// }

// export default HomePage;

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/HomePage.css';

function HomePage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="home-container">
      <header className="hero">
        <h1>Welcome to Buddy Finder</h1>
        <p>Find your group, connect with friends, and make lasting connections.</p>
        {/* Use a button with onClick handler */}
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>
    </div>
  );
}

export default HomePage;




