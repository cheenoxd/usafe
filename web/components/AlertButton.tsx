import React, { useState } from "react";

export default function AlertButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showAlert = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Button */}
      <button
        onClick={showAlert}
        style={{
          backgroundColor: "red", // Equivalent to bg-red-500
          color: "white", // Equivalent to text-white
          fontWeight: "bold", // Equivalent to font-bold
          padding: "8px 16px", // Equivalent to py-2 px-4
          borderRadius: "1000px", // Equivalent to rounded
          border: "none",
          transition: "background-color 0.3s ease", // Equivalent to transition duration-300
          cursor: "pointer", // To ensure the button is clickable
          width: 250,
        }}
      >
        Alert Button
      </button>

      {/* Modal */}
      {isModalVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white", // Modal background
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              maxWidth: "400px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Danger SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              style={{ width: "50px", height: "50px", marginBottom: "16px" }}
            >
              <path
                fillRule="evenodd"
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm-.75 5a.75.75 0 011.5 0v6a.75.75 0 01-1.5 0V7zm.75 10a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
                clipRule="evenodd"
              />
            </svg>
            <h2 style={{ marginBottom: "12px", fontSize: "18px", color: "black" }}>Danger!</h2>
            <p style={{ marginBottom: "20px", color: "black" }}>This is a custom alert message.</p>
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "1000px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
