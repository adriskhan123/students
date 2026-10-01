import express from "express";
import homemodels from "../models/home.models.js";
const router = express.Router();

router.post("/createhomepage", async (req, res) => {
  try {
    const data = req.body;

    const response = await homemodels.create(data);

    console.log(response);

    res.json({
      success: true,
      msg: "Homepage created successfully",
      data: response,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: "Something went wrong",
      error: error.message,
    });
  }
});


router.post("/findhome", async function (req, res) {
  try {
    const response = await homemodels.find();

    res.json({
      success: true,
      msg: "Home data found successfully",
      data: response,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: "Something went wrong",
      error: error.message,
    });
  }
});



router.get("/findonehome", async function (req, res) {
  try {
    const { id } = req.body;

    const response = await homemodels.findOne({ _id: id });

    res.json({
      success: true,
      msg: "The home found successfully",
      data: response
    });

  } catch (error) {
    res.json({
      success: false,
      msg: "Home not found",
      error: error.message
    });
  }
});




router.post("updatehome", async function (req, res) {

let response = await homemodels.findOneAndDelete({
  id:_id
})



  res.json({
    success:true,
    msg:"the updat home"
  })
})

router.post("updatehome", async function (req,res) {
  res.json({
    success:true, msg:"the update is done"
  })
})

export default router;