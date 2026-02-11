import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(storedEvents);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Event Log</h1>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, i) => (
            <tr key={i} className="text-center">
              <td>{e.credentialId}</td>
              <td className={e.type === "Issued" ? "text-green-600" : "text-red-600"}>
                {e.type}
              </td>
              <td>{e.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
