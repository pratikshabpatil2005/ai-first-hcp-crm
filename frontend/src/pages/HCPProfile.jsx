import { useParams } from "react-router-dom";

function HCPProfile() {
  const { id } = useParams();

  return (
    <div style={{ padding: "30px" }}>
      <h1>Healthcare Professional Profile</h1>

      <br />

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,.1)",
        }}
      >
        <h2>Dr. Raj Sharma</h2>

        <p>Specialization: Cardiologist</p>

        <p>Hospital: Apollo Hospital</p>

        <p>City: Mumbai</p>

        <p>Last Interaction: 10 July 2026</p>

        <p>Preferred Product: CardioPlus</p>

        <button>Log Interaction</button>
      </div>
    </div>
  );
}

export default HCPProfile;