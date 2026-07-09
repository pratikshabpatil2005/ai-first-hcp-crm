import { useSelector } from "react-redux";

function HCPList() {
  const hcps = useSelector((state) => state.hcp.hcps);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Healthcare Professionals</h1>

      {hcps.map((hcp) => (
        <div
          key={hcp.id}
          style={{
            background: "#fff",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,.1)",
          }}
        >
          <h2>{hcp.name}</h2>

          <p>Specialization: {hcp.specialization}</p>

          <p>Hospital: {hcp.hospital}</p>

          <p>City: {hcp.city}</p>

          <button>View Profile</button>
        </div>
      ))}
    </div>
  );
}

export default HCPList;