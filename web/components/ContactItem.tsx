import { useState } from "react";

interface ContactItemProps {
  name: string;
}

const ContactItem = ({ name }: ContactItemProps) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleState = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
        fontSize: "16px",
        color: "white",
      }}
    >
      <span>{name}</span>
      <button
        onClick={toggleState}
        style={{
          padding: "5px 10px",
          fontSize: "14px",
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
          backgroundColor: isEnabled ? "#4caf50" : "#f44336", // Green for enabled, red for disabled
          color: "white",
        }}
      >
        {isEnabled ? "Enabled" : "Disabled"}
      </button>
    </li>
  );
};

export default ContactItem;