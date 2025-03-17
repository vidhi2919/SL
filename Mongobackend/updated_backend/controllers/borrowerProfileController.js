const BorrowerProfile = require("../models/borrowerProfile");
const Borrower = require("../models/borrowerModel"); // Ensure correct path!

// Get Borrower Profile by ID
const getBorrowerProfile = async (req, res) => {
    try {
      console.log("Params:", req.params); // Debug to confirm id value
      
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Invalid ID provided" });
      }
  
      const borrower = await Borrower.findById(id);
      if (!borrower) {
        return res.status(404).json({ error: `Borrower not found for ID: ${id}` });
      }
  
      res.status(200).json(borrower);
    } catch (error) {
      console.error("Error fetching borrower profile:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


// Update Borrower Profile
const updateBorrowerProfile = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Updating profile for ID:", id);
  
      const updatedProfile = await Borrower.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProfile) {
        return res.status(404).json({ error: "Borrower not found" });
      }
  
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error("Error updating borrower profile:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  const deleteBorrowerProfile = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Deleting profile for ID:", id);
  
      const deletedProfile = await Borrower.findByIdAndDelete(id);
      if (!deletedProfile) {
        return res.status(404).json({ error: "Borrower not found" });
      }
  
      res.status(200).json({ message: "Borrower profile deleted successfully" });
    } catch (error) {
      console.error("Error deleting borrower profile:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
module.exports = { getBorrowerProfile, updateBorrowerProfile, deleteBorrowerProfile};