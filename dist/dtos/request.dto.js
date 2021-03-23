"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const dto_utils_1 = require("./dto.utils");
class Asset {
    constructor(input) {
        this.id = input.id;
        this.broadcastStartTime = input.broadcastStartTime;
        this.description = input.description;
        this.duration = input.duration;
        this.image = dto_utils_1.updatedImageDns(input.image);
        this.title = input.title;
        if (input.match) {
            this.match = new Match(input.match);
        }
    }
}
exports.Asset = Asset;
class Match {
    constructor(input) {
        this.id = input.id;
        this.homeTeam = new Team(input.homeTeam);
        this.awayTeam = new Team(input.awayTeam);
    }
}
class Team {
    constructor(input) {
        this.id = input.id;
        this.name = input.name;
        this.image = dto_utils_1.updatedImageDns(input.image);
    }
}
//# sourceMappingURL=request.dto.js.map