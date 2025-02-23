const express = require("express");
const router = express.Router();
const menuItem = require("../models/menu.js");

router.post("/menu", async (req, res) => {
  const data = req.body;
  const newMenu = new menuItem(data);
  await newMenu.save();
  console.log("new menu saved");
  res.status(200).json("New menu added");

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/get-menu", async (req, res) => {
  try {
    const menuData = await menuItem.find();
    console.log("Data fetched...");
    res.status(200).json(menuData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-menu/:taste", async (req, res) => {
  try {
    const tasteItem = req.params.taste;
    if (tasteItem == "sweet" || tasteItem == "sour" || tasteItem == "spicy") {
      const newMenu = await menuItem.find({ taste: tasteItem });
      res.status(200).json(newMenu);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (error) {
    console.log("Error in GET /get-menu/:taste:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMenu = await menuItem.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!updatedMenu.matchedCount) {
      res.status(404).json({ error: `menu with ${id} not found` });
    }
    res.status(200).json("menu updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenu = menuItem.deleteOne({ _id: id });
    if (!(await deletedMenu).deletedCount) {
      res.send(404).json({ error: `menu with ${id} not found` });
    }
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
