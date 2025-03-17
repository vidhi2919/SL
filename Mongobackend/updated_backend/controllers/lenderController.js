const Lender = require("../models/lenderModel");

exports.registerLender = async (req, res) => {
  try {
    const lender = await Lender.create(req.body);
    res.status(201).json(lender);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
exports.getLenders = async (req, res) => {
  try {
    const lenders = await Lender.find();
    res.json(lenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/
// lenderController.js

exports.getLenders = async (req, res) => {
  try {
    const lender = await Lender.findById(req.params.id);
    if (!lender) {
      return res.status(404).json({ message: "Lender not found" });
    }
    res.json(lender);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

