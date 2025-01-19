import { Link } from "react-router";
import "./index.css";

export default function WelcomeComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
      <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all hover:shadow-xl hover:-translate-y-1">
        <h1 className="welcome">
          
          Welcome to {'uSafe'}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          We're excited to have you here. Start exploring and enjoy your experience!
        </p>
        <div className="flex-container">
          <Link 
            to="/sign-in"
            className="custom-button"
          >
            Sign in
          </Link>
        </div>
        <div className="flex-container">
          <Link 
            to="/sign-up"
            className="sign-up-btn"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}