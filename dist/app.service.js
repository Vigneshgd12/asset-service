"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ajv_1 = __importDefault(require("ajv"));
const request_dto_1 = require("./dtos/request.dto");
const schema_json_1 = __importDefault(require("./resources/schema.json"));
let AppService = class AppService {
    getValidAssets(assets) {
        let validAssets = [];
        this.validAssets(assets, validAssets);
        return this.updateBroadCastEndTime(validAssets);
    }
    updateBroadCastEndTime(assets) {
        let updatedAssets = [];
        let assetCount = 0;
        assets.forEach(asset => {
            let broadcastEndTime = new Date(asset.broadcastStartTime);
            broadcastEndTime.setSeconds(broadcastEndTime.getSeconds() + asset.duration);
            asset.broadcastEndTime = broadcastEndTime.toISOString();
            updatedAssets[assetCount++] = asset;
        });
        updatedAssets.sort((a, b) => {
            let aStartTime = new Date(a.broadcastStartTime);
            let bStartTime = new Date(b.broadcastStartTime);
            return (aStartTime > bStartTime) ? 1 : ((bStartTime > aStartTime) ? -1 : 0);
        });
        return updatedAssets;
    }
    validAssets(assets, validAssets) {
        const ajv = new ajv_1.default({ strict: false, removeAdditional: true });
        const payeeSchema = schema_json_1.default;
        const schemaref = 'schema.json';
        ajv.addSchema(payeeSchema, schemaref);
        let validAssetCount = 0;
        assets.forEach(asset => {
            const isAssetValid = ajv.validate({ $ref: schemaref + "#/definitions/asset" }, asset);
            if (isAssetValid) {
                if (asset.match) {
                    const isMatchValid = ajv.validate({ $ref: schemaref + "#/definitions/match" }, asset.match);
                    if (!isMatchValid) {
                        delete asset.match;
                        console.log(ajv.errorsText());
                    }
                }
                validAssets[validAssetCount++] = new request_dto_1.Asset(asset);
            }
            else {
                console.log(ajv.errorsText());
            }
        });
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map