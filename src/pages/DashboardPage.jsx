

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import "./DashboardPage.css";

// const sections = [
//   { key: "realtime", label: "Real-Time Sensor Data" },
//   { key: "charts", label: "Charts & Visualizations" },
//   { key: "relay", label: "Relay Control" },
//   { key: "history", label: "Data History / Reports" },
// ];

// const DashboardPage = () => {
//   const [active, setActive] = useState("realtime");
//   const [sensorData, setSensorData] = useState([]);
//   const [schedule, setSchedule] = useState({ onTime: "", offTime: "" });

//   const fetchSensorData = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/readings");
//       setSensorData(res.data.reverse());
//     } catch (err) {
//       console.error("Error fetching sensor data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchSensorData();
//     const interval = setInterval(fetchSensorData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const latestReading = sensorData[0] || {};

//   const handleFanManual = async (type) => {
//     try {
//       await axios.post("http://localhost:5000/api/relay/manual", { fan: type });
//       alert(`Fan turned ${type.toUpperCase()} manually`);
//     } catch (err) {
//       console.error(err);
//       alert("Error sending manual command");
//     }
//   };

//   const handleFanSchedule = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/relay/schedule", schedule);
//       alert(`Fan schedule set: ON at ${schedule.onTime}, OFF at ${schedule.offTime}`);
//     } catch (err) {
//       console.error(err);
//       alert("Error setting schedule");
//     }
//   };

//   const sensorItems = [
//     {
//       label: "Temperature",
//       value: latestReading.temperature,
//       unit: "°C",
//       icon: "🌡️",
//       color: "#e57373",
//       prev: sensorData[1]?.temperature,
//     },
//     {
//       label: "Humidity",
//       value: latestReading.humidity,
//       unit: "%",
//       icon: "💧",
//       color: "#64b5f6",
//       prev: sensorData[1]?.humidity,
//     },
//     {
//       label: "Comfort Index",
//       value:
//         latestReading.temperature != null && latestReading.humidity != null
//           ? Math.round(0.5 * latestReading.temperature + 0.5 * latestReading.humidity)
//           : null,
//       unit: "",
//       icon: "😌",
//       color: "#81c784",
//       prev:
//         sensorData[1]?.temperature != null && sensorData[1]?.humidity != null
//           ? Math.round(0.5 * sensorData[1].temperature + 0.5 * sensorData[1].humidity)
//           : null,
//     },
//   ];

//   return (
//     <div className="dashboard-page">
//       {/* Navbar */}
//       <nav className="dashboard-navbar">
//         <div className="navbar-container">
//           {sections.map((s) => (
//             <button
//               key={s.key}
//               onClick={() => setActive(s.key)}
//               className={`nav-btn ${active === s.key ? "active" : ""}`}
//             >
//               {s.label}
//             </button>
//           ))}
//         </div>
//       </nav>

//       {/* Content */}
//       <div className="dashboard-content" style={{ padding: 20 }}>
//         {/* Real-Time Section */}
//         {active === "realtime" && (
//           <div className="section-card" style={{ width: "100%", boxSizing: "border-box" }}>
//             <h2 className="section-title">📊 Real-Time Sensor Data</h2>
//             <div
//               className="sensor-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//                 gap: 16,
//                 alignItems: "stretch",
//                 width: "100%",
//               }}
//             >
//               {sensorItems.map((item) => {
//                 let trend = "";
//                 if (item.prev != null && item.value != null) {
//                   trend = item.value > item.prev ? "↑" : item.value < item.prev ? "↓" : "→";
//                 }
//                 return (
//                   <div
//                     key={item.label}
//                     className="sensor-box"
//                     style={{
//                       background: `linear-gradient(135deg, ${item.color}15, ${item.color}40)`,
//                       padding: 18,
//                       borderRadius: 12,
//                       minHeight: 120,
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       textAlign: "center",
//                       boxSizing: "border-box",
//                     }}
//                   >
//                     <div className="sensor-icon" style={{ fontSize: 28 }}>{item.icon}</div>
//                     <div className="sensor-label" style={{ marginTop: 8, fontWeight: 600 }}>{item.label}</div>
//                     <div className="sensor-value" style={{ marginTop: 8, fontSize: 20, fontWeight: 700 }}>
//                       {item.value !== null && item.value !== undefined ? `${item.value}${item.unit}` : "-"}{" "}
//                       <span className="trend" style={{ fontSize: 14, marginLeft: 6 }}>{trend}</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Charts Section */}
//         {active === "charts" && (
//           <div className="section-card">
//             <h2 className="section-title">📈 Charts & Visualizations</h2>
//             <div className="chart-container">
//               {/* Uncomment below when using Recharts */}
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={sensorData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
//                   <YAxis />
//                   <Tooltip labelFormatter={(time) => new Date(time).toLocaleString()} />
//                   <Legend />
//                   <Line type="monotone" dataKey="temperature" stroke="#2563eb" strokeWidth={2} dot={false} />
//                   <Line type="monotone" dataKey="humidity" stroke="#38a169" strokeWidth={2} dot={false} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}

//         {/* Relay Section */}
//         {active === "relay" && (
//           <div className="section-card">
//             <h2 className="section-title">⚙️ Relay Control</h2>
//             <div className="relay-grid">
//               <div className="relay-card">
//                 <h3 className="relay-title">Manual Fan Control</h3>
//                 <button className="relay-btn on" onClick={() => handleFanManual("on")}>Turn ON</button>
//                 <button className="relay-btn off" onClick={() => handleFanManual("off")}>Turn OFF</button>
//               </div>
//               <div className="relay-card">
//                 <h3 className="relay-title">Scheduled Fan Control</h3>
//                 <label>Turn ON at:</label>
//                 <input
//                   type="time"
//                   className="time-input"
//                   value={schedule.onTime}
//                   onChange={(e) => setSchedule({ ...schedule, onTime: e.target.value })}
//                 />
//                 <label>Turn OFF at:</label>
//                 <input
//                   type="time"
//                   className="time-input"
//                   value={schedule.offTime}
//                   onChange={(e) => setSchedule({ ...schedule, offTime: e.target.value })}
//                 />
//                 <button className="relay-btn on full" onClick={handleFanSchedule}>Set Schedule</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* History Section */}
//         {active === "history" && (
//           <div className="section-card">
//             <h2 className="section-title">📜 Data History / Reports</h2>
//             <div className="table-wrapper">
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Temperature (°C)</th>
//                     <th>Humidity (%)</th>
//                     <th>Timestamp</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sensorData.map((entry) => (
//                     <tr key={entry._id}>
//                       <td>{entry.temperature}</td>
//                       <td>{entry.humidity}</td>
//                       <td>{new Date(entry.timestamp).toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;



import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./DashboardPage.css";

const sections = [
  { key: "realtime", label: "Real-Time Sensor Data" },
  { key: "charts", label: "Charts & Visualizations" },
  { key: "relay", label: "Relay Control" },
  { key: "history", label: "Data History / Reports" },
];

const DashboardPage = () => {
  const [active, setActive] = useState("realtime");
  const [sensorData, setSensorData] = useState([]);
  const [schedule, setSchedule] = useState({ onTime: "", offTime: "" });

  const fetchSensorData = async () => {
    try {
      const res = await axios.get(
        "https://thermal-comfort-monitoring-backend.onrender.com/api/readings"
      );
      setSensorData(res.data.reverse());
    } catch (err) {
      console.error("Error fetching sensor data:", err);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  const latestReading = sensorData[0] || {};

  const handleFanManual = async (type) => {
    try {
      await axios.post(
        "https://thermal-comfort-monitoring-backend.onrender.com/api/relay/manual",
        { fan: type }
      );
      alert(`Fan turned ${type.toUpperCase()} manually`);
    } catch (err) {
      console.error(err);
      alert("Error sending manual command");
    }
  };

  const handleFanSchedule = async () => {
    try {
      await axios.post(
        "https://thermal-comfort-monitoring-backend.onrender.com/api/relay/schedule",
        schedule
      );
      alert(
        `Fan schedule set: ON at ${schedule.onTime}, OFF at ${schedule.offTime}`
      );
    } catch (err) {
      console.error(err);
      alert("Error setting schedule");
    }
  };

  const sensorItems = [
    {
      label: "Temperature",
      value: latestReading.temperature,
      unit: "°C",
      icon: "🌡️",
      color: "#e57373",
      prev: sensorData[1]?.temperature,
    },
    {
      label: "Humidity",
      value: latestReading.humidity,
      unit: "%",
      icon: "💧",
      color: "#64b5f6",
      prev: sensorData[1]?.humidity,
    },
    {
      label: "Comfort Index",
      value:
        latestReading.temperature != null && latestReading.humidity != null
          ? Math.round(
              0.5 * latestReading.temperature + 0.5 * latestReading.humidity
            )
          : null,
      unit: "",
      icon: "😌",
      color: "#81c784",
      prev:
        sensorData[1]?.temperature != null &&
        sensorData[1]?.humidity != null
          ? Math.round(
              0.5 * sensorData[1].temperature + 0.5 * sensorData[1].humidity
            )
          : null,
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-container">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`nav-btn ${active === s.key ? "active" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="dashboard-content" style={{ padding: 20 }}>
        {/* Real-Time Section */}
        {active === "realtime" && (
          <div
            className="section-card"
            style={{ width: "100%", boxSizing: "border-box" }}
          >
            <h2 className="section-title">📊 Real-Time Sensor Data</h2>
            <div
              className="sensor-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16,
                alignItems: "stretch",
                width: "100%",
              }}
            >
              {sensorItems.map((item) => {
                let trend = "";
                if (item.prev != null && item.value != null) {
                  trend =
                    item.value > item.prev
                      ? "↑"
                      : item.value < item.prev
                      ? "↓"
                      : "→";
                }
                return (
                  <div
                    key={item.label}
                    className="sensor-box"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}15, ${item.color}40)`,
                      padding: 18,
                      borderRadius: 12,
                      minHeight: 120,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      className="sensor-icon"
                      style={{ fontSize: 28 }}
                    >
                      {item.icon}
                    </div>
                    <div
                      className="sensor-label"
                      style={{ marginTop: 8, fontWeight: 600 }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="sensor-value"
                      style={{
                        marginTop: 8,
                        fontSize: 20,
                        fontWeight: 700,
                      }}
                    >
                      {item.value !== null && item.value !== undefined
                        ? `${item.value}${item.unit}`
                        : "-"}{" "}
                      <span
                        className="trend"
                        style={{ fontSize: 14, marginLeft: 6 }}
                      >
                        {trend}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Charts Section */}
        {active === "charts" && (
          <div className="section-card">
            <h2 className="section-title">📈 Charts & Visualizations</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(time) =>
                      new Date(time).toLocaleTimeString()
                    }
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(time) =>
                      new Date(time).toLocaleString()
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="#38a169"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Relay Section */}
        {active === "relay" && (
          <div className="section-card">
            <h2 className="section-title">⚙️ Relay Control</h2>
            <div className="relay-grid">
              <div className="relay-card">
                <h3 className="relay-title">Manual Fan Control</h3>
                <button
                  className="relay-btn on"
                  onClick={() => handleFanManual("on")}
                >
                  Turn ON
                </button>
                <button
                  className="relay-btn off"
                  onClick={() => handleFanManual("off")}
                >
                  Turn OFF
                </button>
              </div>
              <div className="relay-card">
                <h3 className="relay-title">Scheduled Fan Control</h3>
                <label>Turn ON at:</label>
                <input
                  type="time"
                  className="time-input"
                  value={schedule.onTime}
                  onChange={(e) =>
                    setSchedule({ ...schedule, onTime: e.target.value })
                  }
                />
                <label>Turn OFF at:</label>
                <input
                  type="time"
                  className="time-input"
                  value={schedule.offTime}
                  onChange={(e) =>
                    setSchedule({ ...schedule, offTime: e.target.value })
                  }
                />
                <button
                  className="relay-btn on full"
                  onClick={handleFanSchedule}
                >
                  Set Schedule
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        {active === "history" && (
          <div className="section-card">
            <h2 className="section-title">📜 Data History / Reports</h2>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Temperature (°C)</th>
                    <th>Humidity (%)</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorData.map((entry) => (
                    <tr key={entry._id}>
                      <td>{entry.temperature}</td>
                      <td>{entry.humidity}</td>
                      <td>{new Date(entry.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
