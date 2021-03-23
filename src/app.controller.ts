import { Body, Controller, Get, Post } from '@nestjs/common';
import Ajv from 'ajv';
import { AppService } from './app.service';
import { Asset } from './dtos/request.dto';
import validschema from './resources/schema.json'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  getHello(@Body() assets: Asset[]): Asset[] {
    return this.appService.getValidAssets(assets);
  }
}
