"use strict";

const hello = (req, res) => {
    res.render("home/index");
};

const one = (req, res) => {
    res.render("home/1_preparation");
};

const two = (req, res) => {
    res.render("home/2_outfit");
};

const three = (req, res) => {
    res.render("home/3_play");
};

const four = (req, res) => {
    res.render("home/4_mainSession");
};

const five = (req, res) => {
    res.render("home/5_breakoutroom1");
};

const six = (req, res) => {
    res.render("home/6_breakoutroom2");
};

const seven = (req, res) => {
    res.render("home/7_breakoutroom3");
};

const eight = (req, res) => {
    res.render("home/8_party");
};

const nine = (req, res) => {
    res.render("home/9_refreshroom");
};

module.exports = {
    hello,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine
};