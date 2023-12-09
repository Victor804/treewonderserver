import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  getTree(@Param('id') id: string): Tree {
    return this.appService.getTree(Number(id));
  }

  // Search all the trees including the term in their parameters
  @Get("search/:term")
  getTrees(@Param('term') term: string): Array<Tree> {
    return this.appService.getTrees(term);
  }

  // Add a tree
  @Post()
  createBook(@Body() tree: Tree) {
    let id = this.appService.addNewTree(tree);
    return this.appService.getTree(id);
  }

  // Delete all the trees
  @Delete()
  deleteBooks() {
    this.appService.deleteAll("all");
  }

  // Delete all the trees from the original API
  @Delete("api")
  deleteBooksFromAPI() {
    this.appService.deleteAll("api");
  }

  // Delete all the trees added manually
  @Delete("manual")
  deleteBooksManual() {
    this.appService.deleteAll("manual");
  }

  // Delete a tree with his id
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    this.appService.delete(Number(id));
  }

}
