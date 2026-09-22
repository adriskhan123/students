import memberModels from "../models/member.models.js"



async function createfinction(req , res) {

    let response= await memberModels.create(req.body)
         return res.json({
      success: true,
      msg: "The API create is working",
      data: response,
    });
}



async function findfunction(req, res) {
  try {
    let response = await memberModels.find();

    return res.json({
      success: true,
      msg: "Projects found",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
}

  

async function findone(req, res) {
  try {
    let response = await memberModels.findOne({
      _id: req.body.id,
    });

    if (!response) {
      return res.json({
        success: false,
        msg: "Member not found",
      });
    }

    return res.json({
      success: true,
      msg: "Member found",
      data: response,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
}




async function deletemember(req, res) {
let response = await memberModels.findOneAndDelete({
  _id: req.body.id
});

if (!response) {
  return res.json({
    success: false,
    msg: "Member not found"
  });
}

return res.json({
  success: true,
  msg: "Member deleted successfully",
  data: response
});
}






export{
  createfinction,
  findfunction,
  findone,
  deletemember
}