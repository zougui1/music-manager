"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("../setup");
const database_pkg_1 = require("database-pkg");
const user_pkg_1 = require("user-pkg");
async function main(args) {
    const connection = await database_pkg_1.createConnection();
    try {
        await clearUsers();
        await populateUsers();
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await connection.close();
    }
}
exports.main = main;
const clearUsers = async () => {
    const user = new user_pkg_1.User();
    await user.clear();
};
const populateUsers = async () => {
    const user = new user_pkg_1.User();
    await Promise.all([
        user.signup({
            email: 'zougui@gmail.com',
            name: 'Zougui',
            password: 'nopassword',
        }),
        user.signup({
            email: 'duh@duh.duh',
            name: 'Duh',
            password: 'John Duh',
        }),
    ]);
};
//# sourceMappingURL=create-user.js.map