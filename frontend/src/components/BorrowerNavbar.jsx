import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import SmartLendLogo from "../assets/SmartLendLogo7.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [

  { path: "/dashboard", label: "Dashboard" },
  { path: "/loan-application", label: "Apply for Loan" },
  { path: "/loan-status", label: "Loan Status" },
  {path : "/loan-search-page", label: "Loan Search"},
  { path: "/repayment-tracking", label: "Repayment Tracking" },
  { path: "/loan-agreement", label: "Loan Agreement" },
];

const BorrowerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-md fixed w-full top-0 z-50" role="navigation" aria-label="Main Navigation">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Left Section: Profile Icon */}
        <Link to="/borrower-profile" aria-label="Go to profile">
          <UserCircle size={32} className="text-white hover:text-[#F5FFC3]" />
        </Link>

        {/* Logo */}
        <img src={SmartLendLogo} alt="SmartLend Logo" className="h-10" />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-white font-semibold">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="cursor-pointer hover:text-[#F5FFC3]">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-blue-600 text-white text-center py-6 absolute w-full top-[60px] left-0 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 hover:text-[#F5FFC3]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default BorrowerNavbar;
