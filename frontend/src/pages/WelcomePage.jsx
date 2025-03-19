import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WelcomePage = ({ user }) => {
  const isLender = user?.role === "lender";

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-blue-700">Welcome, {user?.name || "User"}! 🎉</h1>
      <p className="text-gray-700 mt-4 text-lg">
        {isLender ? "Manage investments & loans effortlessly!" : "Track your loans & payments easily!"}
      </p>

      <div className="mt-6 flex space-x-4">
        <Link to={isLender ? "/lender-dashboard" : "/dashboard"}>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Go to {isLender ? "Lender" : "Borrower"} Dashboard
          </button>
        </Link>
        <Link to={isLender ? "/lender-profile" : "/borrower-profile"}>
          <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
            View Profile
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
