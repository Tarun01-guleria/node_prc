const express = require("express");
const router = express.Router();
const Person = require("../models/person.js"); // Ensure the correct model name

//CREATE
router.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    await newPerson.save();
    console.log("Data Saved");
    res.status(200).json("Data saved");
  } catch (err) {
    console.log("Error in POST /person:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Read
router.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error in GET /person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Parametrized API
router.get("/person/:work", async (req, res) => {
  try {
    const work = req.params.work;
    if (work == "chef" || work == "waiter" || work == "manager") {
      const response = await Person.find({ work: work });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log("Error in GET /person/:work:", error);
    res.status(500).json("Internal Server error");
  }
});

//Update
router.put("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPerson = await Person.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!updatedPerson.matchedCount) {
      return res.status(404).json({ message: `Person with ${id} not found` });
    }
    return res.status(200).json({ message: "Person updated" });
  } catch (error) {
    console.log("Error in PUT /person/:id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete
router.delete("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePerson = await Person.deleteOne({ _id: id });
    if (!deletePerson.deletedCount) {
      return res.status(404).json({ message: `Person with ${id} not found` });
    }
    return res.status(200).json({ message: "Person Deleted" });
  } catch (error) {
    console.log("Error in DELETE /person/:id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
