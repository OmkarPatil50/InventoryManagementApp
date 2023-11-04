import { useSelector } from "react-redux";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Inventory } from "./Pages/Inventory/Inventory";
import { Sales } from "./Pages/Sales/Sales";
import { Navbar } from "./components/Navbar/Navbar";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Loading } from "./components/Loading/Loading";
import { Report } from "./Pages/Report/Report";

export default function App() {
  const state = useSelector((state) => state);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/reports" element={<Report />} />
      </Routes>
      {state.loading ? <Loading /> : ""}
      <p className="footer-tagline">
        Check Backend{" "}
        <a href="https://replit.com/@OmkarPatil20/Inventory-Management-App">
          Here
        </a>{" "}
      </p>
    </div>
  );
}
