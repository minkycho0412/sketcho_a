const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.hello);

router.get("/1_preparation.ejs", ctrl.one);
router.get("/2_outfit.ejs", ctrl.two);
router.get("/3_play.ejs", ctrl.three);
router.get("/4_mainSession.ejs", ctrl.four);
router.get("/5_breakoutroom1.ejs", ctrl.five);
router.get("/6_breakoutroom2.ejs", ctrl.six);
router.get("/7_breakoutroom3.ejs", ctrl.seven);
router.get("/8_party.ejs", ctrl.eight);
router.get("/9_refreshroom.ejs", ctrl.nine);

module.exports = router;