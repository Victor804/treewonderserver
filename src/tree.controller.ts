import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { TreeService } from './tree.service';
import { Tree } from './Tree';

@Controller("trees")
export class TreeController {
  constructor(private readonly appService: TreeService) {}

  // Get all the trees
  @Get()
  getAllTrees(): Array<Tree> {
    return this.appService.getAllTrees();
  }

  // Get a tree with his id
  @Get(':id')
  getTree(@Param('id') id: number): Tree {
    return this.appService.getTree(id);
  }

  // Add a tree
  @Post()
  createBook(@Body() tree: Tree): Tree {
    this.appService.addTree(tree);
    return this.appService.getTree(tree.id);
  }

  // Delete a tree with his id
  @Delete(':id')
  deleteBook(@Param('id') id: number): void {
    this.appService.delete(id);
  }

  // Search all the trees including the term in their parameters
  @Get("search/:term")
  getTrees(@Param('term') term: string): Array<Tree> {
    return this.appService.getTrees(term);
  }
}
