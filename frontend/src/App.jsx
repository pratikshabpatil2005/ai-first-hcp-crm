import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import HCP from "./pages/HCP";
import Leads from "./pages/Leads";
import Appointments from "./pages/Appointments";
import Tasks from "./pages/Tasks";
import AI from "./pages/AI";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/hcps" element={<HCP />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/ai" element={<AI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

