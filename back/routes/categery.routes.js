import express from "express";
import categerymodels from "../models/categery.models.js";

const route = express.Router();

// create
route.post("/categerycreate", async function (req, res) {
  try {
    let data = req.body;

    let categery = await categerymodels.create(data);

    return res.json({
      success: true,
      msg: "the create api done",
      data: categery
    });
  } catch (error) {
    console.log("CATEGORY CREATE ERROR:", error);
    return res.status(500).json({
      success: false,
      msg: error.message,
      name: error.name,
      errors: error.errors || null
    });
  }
});

// find
route.get("/categeryfind", async function (req, res) {
  try {
    let categeryfind = await categerymodels.find();

    return res.json({
      success: true,
      msg: "the find api is done",
      data: categeryfind
    });
  } catch (error) {
    console.log("CATEGORY FIND ERROR:", error);
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
});

// find one
route.post("/findonecategery", async function (req, res) {
  try {
    let data = req.body;

    let updata = await categerymodels.findOne({
      _id: data.id
    });

    return res.json({
      success: true,
      msg: "the findone api done",
      categery: updata
    });
  } catch (error) {
    console.log("CATEGORY FINDONE ERROR:", error);
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
});




//update//

route.post("/catedeleteapi", async function (req, res) {
  try {
    const data = req.body;

    const updatecate = await categerymodels.findOneAndUpdate(
      {
        _id: data.id
      },
      {
        name: data.name,
        Slug: data.Slug,
        ParentCategory: data.ParentCategory,
        CategoryDescription: data.CategoryDescription,
        CategoryImageURL: data.CategoryImageURL,
        sportoder: data.sportoder
      },
      {
        new: true
      }
    );

    return res.json({
      success: true,
      msg: "Category updated successfully",
      data: updatecate
    });


  } catch (error) {
    console.log("CATEGORY UPDATE ERROR:", error);

    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
});





// delete
route.post("/categerydelete", async function (req, res) {
  try {
    let data = req.body;

    let deletedcategery = await categerymodels.findOneAndDelete({
      _id: data.id
    });

    return res.json({
      success: true,
      msg: "the delete done",
      data: deletedcategery
    });
  } catch (error) {
    console.log("CATEGORY DELETE ERROR:", error);
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
});

export default route;