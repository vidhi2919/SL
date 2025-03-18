import React, { useState } from "react";
import { Link } from "react-router-dom";

// Borrower Data
const borrowerData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  address: "123 Main St, New York, NY 10001",
  profilePicture: "https://via.placeholder.com/150",
  loanAmount: "$10,000",
  loanPurpose: "Personal Loan",
  loanTerm: "12 months",
  annualIncome: "$50,000",
  creditScore: "750",
  bankDetails: {
    accountNumber: "1234567890",
    ifscCode: "ABC1234567",
  },
  documents: [
    { type: "ID Proof", file: "https://example.com/id-proof.pdf" },
    { type: "Address Proof", file: "https://example.com/address-proof.pdf" },
  ],
};

const isLoading = false;
const userType = "borrower";

// Main Profile Component
const BorrowerDisplayProfile = () => {
  const [activeModal, setActiveModal] = useState(null);

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (!borrowerData) {
    return <div className="text-center text-gray-600">No profile data available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Borrower Profile</h2>

        {/* 🔹 Section Buttons (Now ABOVE the details) */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 border-b pb-4">
          {sections.map((section) => (
            <button
              key={section.id}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => setActiveModal(section.id)}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* 🔹 All Details (Always Visible) */}
        <AllDetails borrowerData={borrowerData} />

        {/* 🔹 Modal for Specific Sections */}
        {activeModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
              <h2 className="text-lg font-bold mb-4">{sections.find((s) => s.id === activeModal)?.title}</h2>
              {sections.find((s) => s.id === activeModal)?.content}

              <button
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl"
                onClick={() => setActiveModal(null)}
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Edit Profile Button */}
        <div className="text-center mt-8">
          <Link
            to={`/profile/borrower/edit`}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 text-lg font-semibold"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

// ✅ Always Visible: All Details Section
const AllDetails = ({ borrowerData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <PersonalDetails borrowerData={borrowerData} />
    <LoanDetails borrowerData={borrowerData} />
    <FinancialDetails borrowerData={borrowerData} />
    <BankDetails borrowerData={borrowerData} />
    <Documents borrowerData={borrowerData} />
    <Security borrowerData={borrowerData} />
  </div>
);

// ✅ Section Components (Used for Modals & "All Details")
const PersonalDetails = ({ borrowerData }) => (
  <Card title="Personal Information">
    <img src={borrowerData.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
    <ProfileItem label="Name" value={borrowerData.name} />
    <ProfileItem label="Email" value={borrowerData.email} />
    <ProfileItem label="Phone" value={borrowerData.phone} />
    <ProfileItem label="Address" value={borrowerData.address} />
  </Card>
);

const LoanDetails = ({ borrowerData }) => (
  <Card title="Loan Information">
    <ProfileItem label="Loan Amount" value={borrowerData.loanAmount} />
    <ProfileItem label="Loan Purpose" value={borrowerData.loanPurpose} />
    <ProfileItem label="Loan Term" value={borrowerData.loanTerm} />
  </Card>
);

const FinancialDetails = ({ borrowerData }) => (
  <Card title="Financial Information">
    <ProfileItem label="Annual Income" value={borrowerData.annualIncome} />
    <ProfileItem label="Credit Score" value={borrowerData.creditScore} />
  </Card>
);

const BankDetails = ({ borrowerData }) => (
  <Card title="Bank Details">
    <ProfileItem label="Account Number" value={borrowerData.bankDetails?.accountNumber} />
    <ProfileItem label="IFSC Code" value={borrowerData.bankDetails?.ifscCode} />
  </Card>
);

const Documents = ({ borrowerData }) => (
  <Card title="Documents">
    {borrowerData.documents?.map((doc, index) => (
      <div key={index} className="mb-2">
        <p>{doc.type}: </p>
        <a href={doc.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          View Document
        </a>
      </div>
    ))}
  </Card>
);

const Security = ({ borrowerData }) => (
  <Card title="Security">
    <div className="flex justify-between items-center">
      <span>Password</span>
      <Link
        to="/change-password"
        state={{ userType: "borrower" }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Change Password
      </Link>
    </div>
  </Card>
);

// ✅ Define Sections for Modal
const sections = [
  { id: "personal", title: "Personal Info", content: <PersonalDetails borrowerData={borrowerData} /> },
  { id: "loan", title: "Loan Details", content: <LoanDetails borrowerData={borrowerData} /> },
  { id: "financial", title: "Financial Details", content: <FinancialDetails borrowerData={borrowerData} /> },
  { id: "bank", title: "Bank Details", content: <BankDetails borrowerData={borrowerData} /> },
  { id: "documents", title: "Documents", content: <Documents borrowerData={borrowerData} /> },
  { id: "security", title: "Security", content: <Security borrowerData={borrowerData} /> },
];

// ✅ Reusable Card Component
const Card = ({ title, children }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
    <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
    {children}
  </div>
);

// ✅ Reusable Profile Item Component
const ProfileItem = ({ label, value }) => (
  <p className="mb-4 text-gray-700">
    <span className="font-medium">{label}: </span> {value || "N/A"}
  </p>
);

// Export Main Component
export default BorrowerDisplayProfile;
