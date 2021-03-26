"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
class BaseRepository extends typeorm_1.Repository {
    async deleteAll() {
        await this.delete({});
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map