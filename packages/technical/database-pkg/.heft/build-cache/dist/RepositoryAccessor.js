"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryAccessor = void 0;
const typeorm_1 = require("./typeorm");
class RepositoryAccessor {
    constructor(repo) {
        this._objectRepository = repo;
    }
    getRepo() {
        var _a;
        return (_a = this._repository) !== null && _a !== void 0 ? _a : (this._repository = typeorm_1.getCustomRepository(this._objectRepository));
    }
}
exports.RepositoryAccessor = RepositoryAccessor;
//# sourceMappingURL=RepositoryAccessor.js.map