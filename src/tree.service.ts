import { Injectable, OnModuleInit} from '@nestjs/common';
import { readFile } from 'fs/promises';
import { Tree, compareWithName } from './Tree';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { TreeFromAPI } from './TreeFromAPI';

@Injectable()
export class TreeService implements OnModuleInit {
  private forest = new Map<number, Tree>(); // Storage of the trees

  private id = 1; // Id for the next new tree

  constructor(private readonly httpService: HttpService) {}

  /**
   * Function called on start
   */
  async onModuleInit() {
    try {
      await Promise.all([
          this.loadTreesFromApi(),
          this.importLocalTrees()
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
    this.forest.set(tree.id, tree);
  }

  /**
   * Delete a tree from the storage
   * @param id id of the tree to delete
   */
  delete(id: number): boolean {
    return this.forest.delete(id);
  }

  /**
   * Get all the trees from the storage
   * @returns array of trees
   */
  getAllTrees(): Array<Tree> {
    return Array.from(this.forest.values());
  }

  /**
   * Get one tree by his id
   * @param id id of the tree
   * @returns the tree found
   */
  getTree(id: number): Tree {
    return this.forest.get(id);
  }

  /**
   * Search all the trees including a term in their parameters
   * @param term text to search in all the trees
   * @returns array of trees found, sorted by names
   */
  public getTrees(term: string): Array<Tree> {
    let a = this.getAllTrees()
    .filter((tree) => tree.name.includes(term)
      || (tree.commonName && tree.commonName.includes(term))
      || (tree.botanicName && tree.botanicName.includes(term))
      || (tree.outstandingQualification && tree.outstandingQualification.includes(term))
      || (tree.summary && tree.summary.includes(term))
      || (tree.description && tree.description.includes(term))
      || (tree.type && tree.type.includes(term))
      || (tree.species && tree.species.includes(term))
      || (tree.variety && tree.variety.includes(term))
      || (tree.developmentStage && tree.developmentStage.includes(term))
      || (tree.address && tree.address.includes(term))
      || (tree.height && tree.height.toString().includes(term))
      || (tree.circumference && tree.circumference.toString().includes(term))
      || (tree.plantationYear && tree.plantationYear.toString().includes(term))
    )
    .sort(compareWithName);
    return a
  }

  /**
   * Add a new tree with possible undefind id (in that case, give one an id and return it)
   * @param tree new tree to be added in the storage
   * @returns id of the tree
   */
  public addNewTree(tree: Tree): number {
    // If the id is impossible (undefinded, already in the storage, multiple of 10 (reserved for trees from the original API))
    // Give the tree a new ID
    if(!tree.id || this.forest.has(tree.id) || tree.id % 10 === 0) {
      // Give the new id to the new tree
      tree.id = this.id;
      // Actualise the next id (increment it while it already exists in the map or it is a multiple of 10)
      while(this.forest.has(this.id) && this.id % 10 === 0) this.id += 1
    }
    // Add the tree
    this.addTree(tree)
    // Return the id of the tree
    return tree.id
  }

  /**
   * Import trees from local json file "initialTrees.json"
   * @returns Promise
   */
  private async importLocalTrees(): Promise<void> {
    // Read the file
    const data = await readFile('./src/initialTrees.json');
    // Get the json list of trees from the text
    const trees: Array<Tree> = JSON.parse(data.toString());
    // Add the trees in the storage
    trees.forEach(tree => this.addTree(tree));
    // Actualise the id for the next tree
    while(this.forest.has(this.id) && this.id % 10 === 0) this.id += 1
  }

  /**
   * Import the trees from the only API 
   * @returns Promise
   */
  private async loadTreesFromApi(): Promise<void> {
    await firstValueFrom(
      this.httpService.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/arbresremarquablesparis2011/records?limit=100') // Maximum limit is 100
      .pipe(
          map((response) => response.data["results"]),
          tap((trees: TreeFromAPI[]) => {trees.forEach((tree, index) => this.addTreeFromApi(tree, index+1));}),
          map(() => undefined),
      )
    )
    return firstValueFrom(
      this.httpService.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/arbresremarquablesparis2011/records?limit=100&offset=100') // Maximum limit is 100
      .pipe(
        map((response) => response.data["results"]),
        tap((trees: TreeFromAPI[]) => {trees.forEach((tree, index) => this.addTreeFromApi(tree, index + 101));}),
        map(() => undefined),
      ),
    );
  }

  /**
   * Adds a tree from the online API
   * The tree id will be 10 * index in the original API, so these trees have an id that is a multiple of 10
   * And the other trees (added manually) will have an id that is not a multiple of 10 to avoid collisions
   * @param tree data obtained from the API
   * @param index index of the tree in the original API
   */
  private addTreeFromApi(tree: TreeFromAPI, index: number) {
    this.addTree(new Tree(index*10,
      (tree.arbres_libellefrancais)? tree.arbres_libellefrancais: tree.com_nom_usuel, tree.com_nom_usuel, tree.com_nom_latin,
      tree.arbres_hauteurenm, tree.arbres_circonferenceencm,
      tree.arbres_stadedeveloppement, tree.com_annee_plantation,
      tree.com_qualification_rem, tree.com_resume, tree.com_descriptif,
      tree.arbres_genre, tree.arbres_espece, tree.arbres_varieteoucultivar,
      tree.com_url_pdf, tree.com_url_photo1,
      tree.geom_x_y["lon"], tree.geom_x_y["lat"],
      (tree.com_adresse === null || tree.com_adresse === "")?
        (tree.com_site === null || tree.com_site === "")? tree.arbres_adresse: tree.com_site
        : tree.com_adresse
    ))
  }
}
