"use strict";

const User = require("../../models/User");
const output = {
    hello: (req, res) => {
        res.render("home/index"); //home은 views의 home
    },
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
    one: (req, res) => {
        res.render("home/1_preparation");
    },
    two: (req, res) => {
        res.render("home/2_outfit");
    },
    three: (req, res) => {
        res.render("home/3_play");
    },
    four: (req, res) => {
        res.render("home/4_mainSession");
    },
    five: (req, res) => {
        res.render("home/5_breakoutroom1");
    },
    six: (req, res) => {
        res.render("home/6_breakoutroom2");
    },
    seven: (req, res) => {
        res.render("home/7_breakoutroom3");
    },
    eight: (req, res) => {
        res.render("home/8_party");
    },
    nine: (req, res) => {
        res.render("home/9_refreshroom");
    },
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body); //User class body로 들어감
        const response = await user.login();
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};