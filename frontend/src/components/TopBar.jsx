//components/TopBar.jsx

import { useState } from "react";
import "./topbar.css";
import { Wind, User, LogOut } from "lucide-react";
import logo from "../assets/logo.png";

export default function TopBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
      <div className="logo-box">
        <img src={logo} alt="SpectraRadon Logo" className="logo-img" />
      </div>
      </div>

      <div className="header-right">
        <div
          className="user-box"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="avatar">JD</div>
          <span className="username">John Doe</span>
          {dropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-label">My Account</div>
              <hr className="dropdown-separator" />
              <div className="dropdown-item">
                <User className="dropdown-icon" />
                Profile Settings
              </div>
              <div className="dropdown-item">
                <LogOut className="dropdown-icon" />
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

