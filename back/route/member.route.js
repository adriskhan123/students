import express from "express";

import {
  createfinction,
  findfunction,
  findone,
  deletemember
} from "../controller/member.controller.js";

const router = express.Router();

router.post("/membercreate", createfinction);

router.post("/findapi", findfunction);

router.get("/findoneapi", findone);

router.post("/memberdelete", deletemember);

export default router;