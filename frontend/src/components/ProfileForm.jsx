import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileStepper from "./ProfileStepper";
import LivePreview from "./ProfilePreview";
import useAutoSave from "../hooks/useProfileForm";

import PersonalInfoForm from "./forms/PersonalInfoForm";
import FinancialDetailsForm from "./forms/FinancialDetailsForm";
import InvestmentPreferencesForm from "./forms/InvestmentPreferencesForm";
import LoanPreferencesForm from "./forms/LoanPreferencesForm";
import BankDetailsForm from "./forms/BankDetailsForm";
import VerificationForm from "./forms/VerificationForm";

// 🔹 Simulated existing user data (replace with actual API call)
const existingUserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St, New York, NY",
    profilePicture: "https://via.placeholder.com/150",
    idProof: "https://example.com/id-proof.pdf",
    financialDetails: {
        annualIncome: "$50,000",
        creditScore: "750",
    },
};

const ProfileForm = ({ userType }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        profilePicture: null,
        idProof: null,
        financialDetails: {},
    });
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();

    // 🔹 Load existing user data on mount
    useEffect(() => {
        setFormData(existingUserData); 
    }, []);

    const handleSave = () => {
        setShowPreview(true);
    };

    const confirmSave = () => {
        console.log("Saving form data:", formData);
        setShowPreview(false);
        navigate(userType === "lender" ? "/profile/lender" : "/profile/borrower");
    };

    const discardChanges = () => {
        const confirmExit = window.confirm("Are you sure you want to discard changes?");
        if (confirmExit) {
            navigate(userType === "lender" ? "/profile/lender" : "/profile/borrower");
        }
    };

    useAutoSave(formData);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const renderForm = () => {
        switch(step) {
            case 1:
                return <PersonalInfoForm formData={formData} setFormData={setFormData} nextStep={nextStep} />;
            case 2:
                return <VerificationForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return userType === "borrower" 
                    ? <FinancialDetailsForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />
                    : <InvestmentPreferencesForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 4:
                return userType === "borrower"
                    ? <LoanPreferencesForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />
                    : <BankDetailsForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <ProfileStepper step={step} />

            <div className="flex flex-col gap-8">
                <div className="flex-grow mb-8">
                    {renderForm()}
                    <div className="flex justify-between mt-4">
                        <button 
                            onClick={prevStep} 
                            className={`bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition-colors duration-300 ${step === 1 ? 'invisible' : ''}`}
                        >
                            Back
                        </button>
                        <button 
                            onClick={nextStep} 
                            className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300 ${step === 4 ? 'invisible' : ''}`}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="flex justify-center mt-4 space-x-4">
                    <button 
                        onClick={discardChanges}
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                    >
                        Discard Changes
                    </button>
                    <button 
                        onClick={handleSave}
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                    >
                        Save
                    </button>
                </div>
            </div>

            {/* 🔹 Modal for Live Preview */}
            {showPreview && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[75%] max-w-3xl">
                        <h2 className="text-lg font-bold mb-4 text-center">Preview Profile</h2>
                        <LivePreview data={formData} /> {/* Live Preview inside the modal */}
                        
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={() => setShowPreview(false)} 
                                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmSave} 
                                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                            >
                                Confirm & Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileForm;
