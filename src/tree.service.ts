import { Injectable, OnModuleInit} from '@nestjs/common';
import { readFile } from 'fs/promises';
import { Tree, compareWithName } from './Tree';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { TreeFromAPI } from './TreeFromAPI';

@Injectable()
export class TreeService implements OnModuleInit {
  private forest = new Map<number, Tree>(); // Storage of the trees

  constructor(private readonly httpService: HttpService) {}

  /**
   * Function called on start: load the initial trees
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
  private addTree(tree: Tree) {
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
      || (tree.address && tree.address.includes(term))
      || (tree.height && tree.height.toString().includes(term))
      || (tree.circumference && tree.circumference.toString().includes(term))
      || (tree.plantationYear && tree.plantationYear.toString().includes(term))
    )
    .sort(compareWithName);
    return a
  }

  /**
   * Delete all the trees from the original API or added manually
   * @param origin "all" (delete all the trees), "api" (delete trees from the original api) or "manual" (delete trees added manually)
   * @returns whether the parameter origin was valid or not
   */
  deleteAll(origin: string): boolean {
    if(origin === "all") {
      this.forest.clear()
    }
    else if (origin === "api") {
      for (let key of this.forest.keys())
        if(key % 10 === 0) this.delete(key)
    }
    else if (origin === "manual") {
      for (let key of this.forest.keys())
        if(key % 10 > 0) this.delete(key)
    }
    else return false;
    return true;
  }


  /**
   * Add a new manual tree
   * The tree id will not be a multiple of 10, reserved for trees from the original API to differentiate them
   * The id can be undefind (or equal to 0), in that case the function gives the tree an id
   * @param tree new tree to be added in the storage
   * @returns id of the tree
   */
  public addNewTree(tree: Tree): number {
    // If the id is impossible: undefinded, or multiple of 10
    if(!tree.id || tree.id % 10 === 0) {
      // Find a new id
      let id = 1
      while(this.forest.has(id) || id % 10 === 0) id += 1
      // Give the new id to the tree
      tree.id = id;
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
    trees.forEach(tree => this.addNewTree(tree));
  }

  /**
   * Import the trees from the online API
   * The original API accepts requests of 100 item maximum, so the function needs to make 2 requests
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
   * And the other trees (added manually) will have an id that is not a multiple of 10 to avoid collisions during the initial loading
   * @param tree data obtained from the API
   * @param index index of the tree in the original API
   */
  private addTreeFromApi(tree: TreeFromAPI, index: number) {
    this.addTree(new Tree(index*10,
      (tree.arbres_libellefrancais)? tree.arbres_libellefrancais: tree.com_nom_usuel, tree.com_nom_usuel, tree.com_nom_latin,
      tree.arbres_hauteurenm, tree.arbres_circonferenceencm,
      tree.com_annee_plantation,
      tree.com_qualification_rem, tree.com_resume, tree.com_descriptif,
      tree.arbres_genre, tree.arbres_espece, tree.arbres_varieteoucultivar,
      tree.com_url_pdf, tree.com_url_photo1,
      tree.geom_x_y["lon"], tree.geom_x_y["lat"],
      // For the address, com_address is privileged, or com_site if the previous one is null, otherwise arbres_adresse
      (tree.com_adresse === null || tree.com_adresse === "")?
        (tree.com_site === null || tree.com_site === "")? tree.arbres_adresse: tree.com_site
        : tree.com_adresse
    ))
  }
}
