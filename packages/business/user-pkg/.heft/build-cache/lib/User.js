"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_pkg_1 = require("database-pkg");
const hash = __importStar(require("hash-pkg"));
const errors_1 = require("./errors");
const defaultPasswordHash = '$argon2id$v=19$m=64,t=1,p=1$IzljqZZODW3Qa8aLgBMIrw$hpB1Ub440QGRyLt58KdAu4Bw3tHDazn68xO4gleFp3w';
class User extends database_pkg_1.RepositoryAccessor {
    constructor() {
        super(database_pkg_1.UserRepository);
    }
    //#region public
    async findMany() {
        return await this.repo.find();
    }
    async login(email, password) {
        var _a;
        const user = await this.repo.findByEmail(email);
        // always verify the password even if the user does not exist
        // to prevent time attacks
        const isPassword = !!(user === null || user === void 0 ? void 0 : user.password);
        const isValid = await hash.verify((_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : defaultPasswordHash, password);
        if (!isValid || !isPassword || !user) {
            throw new errors_1.IncorrectCredentialsError();
        }
        return user;
    }
    async clear() {
        await this.repo.deleteAll();
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map