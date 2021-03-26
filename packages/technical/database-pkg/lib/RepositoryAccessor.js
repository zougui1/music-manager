"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryAccessor = void 0;
const typeorm_1 = require("./typeorm");
class RepositoryAccessor {
    constructor(repo) {
        this._objectRepository = repo;
    }
    get repo() {
        var _a;
        return (_a = this._repo) !== null && _a !== void 0 ? _a : (this._repo = this.getRepo(this._objectRepository));
    }
    getRepo(repo) {
        return typeorm_1.getCustomRepository(repo);
    }
}
exports.RepositoryAccessor = RepositoryAccessor;
//# sourceMappingURL=RepositoryAccessor.js.map