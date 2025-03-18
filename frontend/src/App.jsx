import React, { useState, useEffect } from "react"; // ✅ Fixed useEffect import
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import BorrowerDashboard from "./components/BorrowerDashboard";
import LoanApplicationPage from "./pages/LoanApplication";
import BorrowerEditProfile from "./components/profile/BorrowerEditProfile";
import LenderEditProfile from "./components/profile/LenderEditProfile";
import LenderProfile from "./pages/LenderProfile";
import BorrowerProfile from "./pages/BorrowerProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import TransactionHistory from "./pages/TransactionHistory";
import NotificationsPage from "./pages/NotificationsPage";

const App = () => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Protect routes based on user type
  const ProtectedRoute = ({ element, allowedForLender = false, allowedForBorrower = false }) => {
    if (!user) {
      return <Navigate to="/loginpage" />;
    }

    if (user.isLender && !allowedForLender) {
      return <Navigate to="/borrower-dashboard" />;
    }

    if (!user.isLender && !allowedForBorrower) {
      return <Navigate to="/lender/lender-dashboard" />;
    }

    return element;
  };

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signuppage" element={<SignupPage />} />
        <Route path="/loginpage" element={<LoginPage setUser={setUser} />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/borrower-dashboard"
          element={<ProtectedRoute element={<BorrowerDashboard />} allowedForBorrower />}
        />
        <Route
          path="/lender/lender-dashboard"
          element={<ProtectedRoute element={<LenderProfile />} allowedForLender />}
        />

        {/* <Route
          path="/loan-application"
          element={<ProtectedRoute element={<LoanApplicationPage />} allowedForBorrower />}
        /> */}
        {/* <Route
          path="/loan-application"
          element={user ? <LoanApplicationPage /> : <Navigate to="/loginpage" />} // Protect Loan Application Page
        /> */}

        // Direct access for testing:
        <Route path="/loan-application" element={<LoanApplicationPage/>} />

        <Route
          path="/profile/borrower"
          element={<ProtectedRoute element={<BorrowerProfile />} allowedForBorrower />}
        />
        <Route
          path="/profile/lender"
          element={<ProtectedRoute element={<LenderProfile />} allowedForLender />}
        />
        <Route
          path="/profile/borrower/edit"
          element={<ProtectedRoute element={<BorrowerEditProfile />} allowedForBorrower />}
        />
        <Route
          path="/profile/lender/edit"
          element={<ProtectedRoute element={<LenderEditProfile />} allowedForLender />}
        />
        <Route
          path="/transaction-history"
          element={<ProtectedRoute element={<TransactionHistory userRole={user?.isLender ? "lender" : "borrower"} />} />}
        />
        <Route
          path="/notifications"
          element={<ProtectedRoute element={<NotificationsPage userRole={user?.isLender ? "lender" : "borrower"} />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
