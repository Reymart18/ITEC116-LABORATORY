// src/App.js
import React, { useState } from "react";
import Activity1 from "./activities/Activity1";
import Activity2 from "./activities/Activity2/Activity2";

function App() {
  const [currentActivity, setCurrentActivity] = useState(null);

  const handleBackToMenu = () => setCurrentActivity(null);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {!currentActivity && (
        <>
          <h1>Laboratory Activities</h1>
          <div style={{ margin: "20px 0" }}>
            <button
              onClick={() => setCurrentActivity("Activity1")}
              style={buttonStyle("#4A90E2")}
            >
              Activity 1
            </button>
            <button
              onClick={() => setCurrentActivity("Activity2")}
              style={buttonStyle("#50C878")}
            >
              Activity 2
            </button>
          </div>
          <p>Please select an activity to start.</p>
        </>
      )}

      {currentActivity === "Activity1" && (
        <Activity1 onBack={handleBackToMenu} />
      )}
      {currentActivity === "Activity2" && (
        <Activity2 onBack={handleBackToMenu} />
      )}
    </div>
  );
}

const buttonStyle = (color) => ({
  margin: "0 10px",
  padding: "10px 20px",
  cursor: "pointer",
  background: color,
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  transition: "0.3s",
});

export default App;
