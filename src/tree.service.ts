import { Injectable } from '@nestjs/common';
import { Tree } from './Tree';
import { promises } from 'fs';

@Injectable()
export class TreeService {
  private readonly storage = new Map<number, Tree>();

  /**
   * Function called on start
   */
  async onModuleInit() {
    console.log("Start")
    try {
      Promise.all([
          this.loadBooksFromApi(),
          this.importLocalBooks()
      ]);
    } catch(err) {
      console.log('error ${err}');
    };
  }

  addTree(tree: Tree): void {
    this.storage.set(tree.id, tree);
  }

  getTree(id: number): Tree {
    return this.storage.get(id);
  }

  getAllTrees(): Array<Tree> {
    return Array.from(this.storage.values());
  }

  loadBooksFromApi() {}

  /**
   * Import books from local json file "initialTrees.json"
   */
  async importLocalBooks() {
    try {
      const data = await promises.readFile('./src/initialTrees.json');
      let trees = JSON.parse(data.toString());
      for (let i = 0; i < trees.length; i++) {
          console.log(trees[i]);
          this.addTree(trees[i]);
      }
    } catch(err) {
        console.log('error');
    };
  }

}
