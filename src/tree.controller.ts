import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TreeService } from './tree.service';
import { Tree } from './Tree';

@Controller("")
export class TreeController {
  constructor(private readonly appService: TreeService) {}

  @Get("/")
  getAllTrees(): Array<Tree> {
    return this.appService.getAllTrees();
  }
}
