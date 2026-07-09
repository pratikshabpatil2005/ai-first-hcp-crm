function DashboardCard({ title, value }) {
    return (
        <div
            style={{
                width: "220px",
                background: "#ffffff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
        >
            <h3>{title}</h3>

            <h1>{value}</h1>
        </div>
    );
}

export default DashboardCard;