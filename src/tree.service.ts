import { Injectable } from '@nestjs/common';
import { Tree, compareWithName } from './Tree';
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

  /**
   * Add a tree in the storage
   * @param tree new tree to add
   */
  addTree(tree: Tree) {
    this.storage.set(tree.id, tree);
  }

  /**
   * Delete a tree from the storage
   * @param id id of the tree to delete
   */
  delete(id: number) {
    this.storage.delete(id);
  }

  /**
   * Get all the trees from the storage
   * @returns array of trees
   */
  getAllTrees(): Array<Tree> {
    return Array.from(this.storage.values());
  }

  /**
   * Get one tree by his id
   * @param id id of the tree
   * @returns the tree found
   */
  getTree(id: number): Tree {
    return this.storage.get(id);
  }

  /**
   * Search all the trees including a term in their parameters
   * @param term text to search in all the trees
   * @returns array of trees found, sorted by names
   */
  getTrees(term: string): Array<Tree> {
    return this.getAllTrees()
    .filter((tree) => tree.name.includes(term) || tree.commonName.includes(term) || tree.botanicName.includes(term)
      || tree.outstandingQualification.includes(term) || tree.summary.includes(term) || tree.description.includes(term)
      || tree.type.includes(term) || tree.species.includes(term) || tree.variety.includes(term)
      || tree.taxonomicAuthority.includes(term) || tree.developmentStage.includes(term)
      || tree.city.includes(term) || tree.site.includes(term) || tree.address.includes(term) || tree.domanialite.includes(term)
      || tree.numDelib.includes(term) || tree.dateDelib.includes(term) || tree.copyright.includes(term)
    )
    .sort(compareWithName);
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
