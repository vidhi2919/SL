import React, { useState } from "react";
import { motion } from "framer-motion";
import BorrowerLayout from "../components/BorrowerLayout";

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    loanID: "",
    age: "",
    income: "",
    loanAmount: "",
    creditScore: "",
    monthsEmployed: "",
    numCreditLines: "",
    interestRate: "",
    loanTerm: "",
    dtiRatio: "",
    education: "",
    employmentType: "",
    maritalStatus: "",
    hasMortgage: "",
    hasDependents: "",
    loanPurpose: "",
    hasCoSigner: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);
    setSubmitted(true);
  };

  return (
    <motion.div
      className="container mx-auto p-6 max-w-2xl bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Loan Application
      </h2>

      {submitted ? (
        <div className="text-green-600 text-center font-semibold text-xl">
          ✅ Your loan application has been submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Personal Details */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Income ($)</label>
            <input
              type="number"
              name="income"
              placeholder="Income ($)"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Loan Information */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Loan Amount ($)</label>
            <input
              type="number"
              name="loanAmount"
              placeholder="Loan Amount ($)"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Credit Score</label>
            <input
              type="number"
              name="creditScore"
              placeholder="Credit Score"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Employment and Financial Details */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Months Employed</label>
            <input
              type="number"
              name="monthsEmployed"
              placeholder="Months Employed"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Number of Credit Lines</label>
            <input
              type="number"
              name="numCreditLines"
              placeholder="Number of Credit Lines"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Financial Details */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              name="interestRate"
              placeholder="Interest Rate (%)"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Loan Term (Months)</label>
            <input
              type="number"
              name="loanTerm"
              placeholder="Loan Term (Months)"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Categorical Fields */}
          {/* Education */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Education</label>
            <select
              name="education"
              onChange={handleChange}
              required
              className='border p-2 w-full rounded-lg'
              >
              <option value="" disabled selected>
                Select Education Level
              </option>
              <option value="PhD">PhD</option>
              <option value="Master's">Master's</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="High School">High School</option>
            </select>
          </div>

          {/* Employment Type */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Employment Type</label>
            <select
              name="employmentType"
              onChange={handleChange}
              required
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            >
              <option value="" disabled selected>
                Select Employment Type
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              required
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            >
              <option value="" disabled selected>
                Select Marital Status
              </option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          {/* Has Mortgage */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Has Mortgage</label>
            <select
              name="hasMortgage"
              onChange={handleChange}
              required
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            >
              <option value="" disabled selected>
                Do you have a mortgage?
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Has Dependents */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Has Dependents</label>
            <select
              name="hasDependents"
              onChange={handleChange}
              required
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            >
              <option value="" disabled selected>
                Do you have dependents?
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Loan Purpose */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Loan Purpose</label>
            <select
              name="loanPurpose"
              onChange={handleChange}
              required
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            >
              <option value="" disabled selected>
                Select Loan Purpose
              </option>
              <option value="Home">Home</option>
              <option value="Auto">Auto</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Has Co-Signer */}
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Has Co-Signer</label>
            <select
              name="hasCoSigner"
              onChange={handleChange}
              required
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            >
              <option value="" disabled selected>
                Do you have a co-signer?
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`p-3 w-full rounded-lg font-bold bg-green-500 hover:bg-green-600 text-white`}
          >
            Submit Application
          </button>

        </form>
      )}
    </motion.div>
  );
};

export default LoanApplication;
