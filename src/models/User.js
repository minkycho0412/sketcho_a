"use strict";

const { response } = require("express");
const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }
    async login() {
        const client = this.body;
        const { id, psword } = await UserStorage.getUserInfo(client.id);

        if (id) {
            if (id === client.id && psword === client.psword) {
            return { success: true };
        }
        return { success: false, msg: "The password is wrong." };
        }
        return { success: false, msg: "ID does not exist." };
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = User;