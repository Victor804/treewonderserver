import {
  Controller,
  Get,
  Param,
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

  // Search all the trees including the term in their parameters
  @Get(":term")
  getTrees(@Param('term') term: string): Array<Tree> {
    return this.appService.getTrees(term);
  }
}
