import { useUser, useSignOut } from "@gadgetinc/react";
import { api } from "../api";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import ContactItem from "../components/ContactItem";



export default function Navbar() {
  const signOut = useSignOut();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isHovered, setIsHovered] = useState(false); // State to track hover
   const hideNavbar = ['/sign-in', '/sign-up','/', '/new-person', '/forgot-password'].includes(location.pathname);
  
  if (hideNavbar) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  const isFullAccountPage = location.pathname === '/full-account';

  const baseMenuItemStyle = {
    marginBottom: "10px",
    fontSize: "18px",
    cursor: "pointer",
    color: "white",
    padding: "10px",
    opacity: isMenuOpen ? 1 : 0,
    transition: "all 0.3s ease",
    backgroundColor: isHovered ? "#555" : "transparent",
  };

  return (
   <>
      <div>
        {/* Burger Icon */}
        <span
          style={{
            fontSize: "30px",
            cursor: "pointer",
            color: "white",
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </span>

        {/* Slide-Out Menu */}
        <div
          style={{
            position: "fixed",
            top: "0",
            right: isMenuOpen ? "0" : "-300px",
            width: "300px",
            height: "100%",
            backgroundColor: "#444",
            color: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            transition: "right 0.3s ease",
            zIndex: 1000,
          }}
        >
          {/* Close Button */}
          <span
            style={{
              fontSize: "30px",
              cursor: "pointer",
              color: "white",
              alignSelf: "flex-end",
              marginBottom: "20px",
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            &#10005;
          </span>

          {/* Sign Out Button */}
          <div
            style={baseMenuItemStyle}
            onClick={handleSignOut}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Sign Out
          </div>

          {/* Contacts Section */}
          <div>
            <div
              style={{
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "default",
                color: "white",
                padding: "10px",
              }}
            >
              Contacts
            </div>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {[
                { id: 1, name: "John Doe" },
                { id: 2, name: "Jane Smith" },
                { id: 3, name: "Alice Johnson" },
                { id: 4, name: "Bob Williams" },
              ].map((contact) => (
                <ContactItem key={contact.id} name={contact.name} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}