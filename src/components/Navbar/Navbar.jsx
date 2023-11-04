import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <section className="navbar-left">
        <h1 className="app-heading-navbar">
          <i className="fa-solid fa-warehouse"></i> <span>Inventory</span>
          Management
        </h1>
      </section>
      <section className="navbar-right">
        <NavLink to="/" activeclassname="active" className="link nav-items">
          Dashboard
        </NavLink>
        <NavLink
          to="/inventory"
          activeclassname="active"
          className="link nav-items"
        >
          Inventory
        </NavLink>
        <NavLink
          to="/sales"
          activeclassname="active"
          className="link nav-items"
        >
          Sales
        </NavLink>
        <NavLink
          to="/reports"
          activeclassname="active"
          className="link nav-items"
        >
          Reports
        </NavLink>
      </section>
    </nav>
  );
};
