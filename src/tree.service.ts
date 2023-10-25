import { Injectable } from '@nestjs/common';
import { Tree } from './Tree';

@Injectable()
export class TreeService {
  private readonly storage = new Map<number, Tree>();

  addTree(tree: Tree): void {
    this.storage.set(tree.id, tree);
  }

  getTree(id: number): Tree {
    return this.storage.get(id);
  }

  getAllTrees(): Array<Tree> {
    return Array.from(this.storage.values());
  }

}
