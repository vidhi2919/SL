import React, { useState } from "react";
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
import LoanSearch from "./pages/LoanSearchPage";
import LoanStatusPage from "./pages/LoanApprovalStatus";
import LoanAgreementPage from "./pages/LoanAgreement";
import RepaymentTrackingPage from "./pages/RepaymentTracking";
import LenderDashboard from "./pages/lender/LenderDashboard";
import LoanMatchingFunding from "./pages/lender/LoanMatchingFunding";
import CollaborativeLoanFunding from "./pages/lender/CollaborativeLoanFunding";
import InvestmentPortfolio from "./pages/lender/InvestmentPortfolio";
import LoanAgreementReview from "./pages/lender/LoanAgreementReview";
import PublicNavbar from "./components/PublicNavbar";
import BorrowerNavbar from "./components/BorrowerNavbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [user, setUser] = useState(null); // Authentication state

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          {user ? <BorrowerNavbar /> : <PublicNavbar />}
        </div>
  
        {/* Main Content - Add padding to prevent overlap */}
        <div className="flex-grow pt-16"> {/* pt-16 for navbar, pb-20 for footer */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signuppage" element={<SignupPage />} />
            <Route path="/loginpage" element={<LoginPage setUser={setUser} />} />
            <Route path="/borrower-dashboard" element={<BorrowerDashboard />} />
            <Route path="/lender-dashboard" element={<LenderDashboard />} />
            {/*<Route path="/loan-application" element={user ? <LoanApplicationPage /> : <Navigate to="/loginpage" />} />*/}
            <Route path="/loan-application" element={<LoanApplicationPage />} />
            <Route path="/loan-approval-status" element={<LoanStatusPage />} />
            <Route path="/loan-agreement" element={<LoanAgreementPage />} />
            <Route path="/repayment-tracking" element={<RepaymentTrackingPage />} />
            <Route path="/profile/borrower" element={<BorrowerProfile />} />
            <Route path="/profile/lender" element={<LenderProfile />} />
            <Route path="/profile/borrower/edit" element={<BorrowerEditProfile />} />
            <Route path="/profile/lender/edit" element={<LenderEditProfile />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/transaction-history" element={<TransactionHistory userRole="lender" />} />
            <Route path="/notifications" element={<NotificationsPage UserType="lender" />} />
            <Route path="/loan-search" element={<LoanSearch />} />
            <Route path="/loan-matching-funding" element={<LoanMatchingFunding />} />
            <Route path="/collaborative-loan-funding" element={<CollaborativeLoanFunding />} />
            <Route path="/investment-portfolio" element={<InvestmentPortfolio />} />
            <Route path="/loan-agreement-review" element={<LoanAgreementReview />} />
            <Route path="/lender/loan-matching-funding" element={<LoanMatchingFunding />} />
            <Route path="/lender/collaborative-loan-funding" element={<CollaborativeLoanFunding />} />
            <Route path="/lender/investment-portfolio" element={<InvestmentPortfolio />} />
            <Route path="/lender/loan-agreement-review" element={<LoanAgreementReview />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer className="mt-auto" />
      </div>
    </Router>
  );
}
export default App;