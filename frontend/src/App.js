// src/App.js
import React, { useState } from "react";
import Activity1 from "./activities/Activity1";
import Activity2 from "./activities/Activity2/Activity2";

function App() {
  const [currentActivity, setCurrentActivity] = useState(null);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Laboratory Activities</h1>

      {/* Menu */}
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => setCurrentActivity("Activity1")}
          style={{ margin: "0 10px", padding: "10px 20px", cursor: "pointer" }}
        >
          Activity 1
        </button>
        <button
          onClick={() => setCurrentActivity("Activity2")}
          style={{ margin: "0 10px", padding: "10px 20px", cursor: "pointer" }}
        >
          Activity 2
        </button>
      </div>

      {/* Render chosen activity */}
      <div>
        {currentActivity === "Activity1" && <Activity1 />}
        {currentActivity === "Activity2" && <Activity2 />}
        {!currentActivity && <p>Please select an activity to start.</p>}
      </div>
    </div>
  );
}

export default App;
