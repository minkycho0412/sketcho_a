const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.get("/1_preparation.ejs", ctrl.output.one);
router.get("/2_outfit.ejs", ctrl.output.two);
router.get("/3_play.ejs", ctrl.output.three);
router.get("/4_mainSession.ejs", ctrl.output.four);
router.get("/5_breakoutroom1.ejs", ctrl.output.five);
router.get("/6_breakoutroom2.ejs", ctrl.output.six);
router.get("/7_breakoutroom3.ejs", ctrl.output.seven);
router.get("/8_party.ejs", ctrl.output.eight);
router.get("/9_refreshroom.ejs", ctrl.output.nine);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;