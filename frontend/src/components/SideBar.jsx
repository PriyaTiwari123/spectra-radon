//compoenents/SideBar.jsx


import { Home, Fan } from "lucide-react";
import "./sidebar.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <Home /> },
  { id: "control", label: "Fan Control", icon: <Fan /> },
];

export default function SideBar({ activeScreen, setActiveScreen }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeScreen === item.id ? "active" : ""}`}
            onClick={() => setActiveScreen(item.id)}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
