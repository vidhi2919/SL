const InvestmentPreferencesForm = ({ formData, setFormData}) => {
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Investment Preferences</h2>
  
        <div className="space-y-6">
          <div>
            <label htmlFor="availableFunds" className="block text-sm font-medium text-gray-700 mb-1">
              Total Funds Available for Lending (₹)
            </label>
            <input
              type="number"
              id="availableFunds"
              name="availableFunds"
              value={formData.availableFunds || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
  
          <div>
            <label htmlFor="minInterestRate" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Acceptable Interest Rate (%)
            </label>
            <input
              type="number"
              id="minInterestRate"
              name="minInterestRate"
              value={formData.minInterestRate || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
  
          <div>
            <label htmlFor="maxLoanAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Single Loan Amount (₹)
            </label>
            <input
              type="number"
              id="maxLoanAmount"
              name="maxLoanAmount"
              value={formData.maxLoanAmount || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
  
          <div>
            <label htmlFor="maxLoanTerm" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Loan Term (Months)
            </label>
            <input
              type="number"
              id="maxLoanTerm"
              name="maxLoanTerm"
              value={formData.maxLoanTerm || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
  
          <div>
            <label htmlFor="riskAppetite" className="block text-sm font-medium text-gray-700 mb-1">
              Risk Appetite
            </label>
            <select
              id="riskAppetite"
              name="riskAppetite"
              value={formData.riskAppetite || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  
  export default InvestmentPreferencesForm;
  