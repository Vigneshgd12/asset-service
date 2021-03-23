import { Injectable } from '@nestjs/common';
import Ajv from 'ajv';
import { Asset } from './dtos/request.dto';
import validschema from './resources/schema.json'

@Injectable()
export class AppService {
  getValidAssets(assets:Asset[]): Asset[] {

    let validAssets = [];
    this.validAssets(assets, validAssets);

    return this.updateBroadCastEndTime(validAssets);
  }

  private updateBroadCastEndTime(assets:Asset[]) : Asset[] {

    let updatedAssets:Asset[] = [];
    let assetCount = 0;
    assets.forEach(asset => {
      let broadcastEndTime: Date = new Date(asset.broadcastStartTime);
      broadcastEndTime.setSeconds(broadcastEndTime.getSeconds() + asset.duration);
      asset.broadcastEndTime = broadcastEndTime.toISOString();
      updatedAssets[assetCount++] = asset;
    });

    updatedAssets.sort((a,b) => {
      let aStartTime: Date = new Date(a.broadcastStartTime);
      let bStartTime: Date = new Date(b.broadcastStartTime);
      return (aStartTime > bStartTime) ? 1 : ((bStartTime > aStartTime) ? -1 : 0);});

    return updatedAssets;
  }

  
  private validAssets(assets: Asset[], validAssets: any[]) {
    const ajv = new Ajv({ strict: false, removeAdditional: true });
    const payeeSchema = validschema;
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
        validAssets[validAssetCount++] = new Asset(asset);
      } else {
        console.log(ajv.errorsText());
      }
    });
  }
}
