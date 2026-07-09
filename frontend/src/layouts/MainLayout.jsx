import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
    return (
        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "250px",
                    padding: "20px",
                }}
            >
                <Navbar />

                {children}
            </div>
        </>
    );
}

export default MainLayout;