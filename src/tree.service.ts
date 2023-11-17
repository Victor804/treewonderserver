import { Injectable } from '@nestjs/common';
import { Tree, compareWithName } from './Tree';
import { promises } from 'fs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { TreeFromAPI } from './TreeFromAPI';

@Injectable()
export class TreeService {
  private readonly forest = new Map<number, Tree>();

  constructor(private readonly httpService: HttpService) {}

  /**
   * Function called on start
   */
  async onModuleInit() {
    console.log("Start")
    try {
      Promise.all([
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
  delete(id: number) {
    this.forest.delete(id);
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
    return this.getAllTrees()
    .filter((tree) => tree.name.includes(term) || tree.commonName.includes(term) || tree.botanicName.includes(term)
      || tree.outstandingQualification.includes(term) || tree.summary.includes(term) || tree.description.includes(term)
      || tree.type.includes(term) || tree.species.includes(term) || tree.variety.includes(term) ||  tree.developmentStage.includes(term)
      || tree.address.includes(term) || tree.addressBis.includes(term)
    )
    .sort(compareWithName);
  }

  /**
   * Import trees from local json file "initialTrees.json"
   * @returns Promise
   */
  private async importLocalTrees(): Promise<void> {
    const data = await promises.readFile('./src/initialTrees.json');
    const trees: Array<Tree> = JSON.parse(data.toString());
    trees.forEach(tree => this.addTree(tree));
  }

  /**
   * Import the trees from the only API 
   * @returns Promise
   */
  private async loadTreesFromApi(): Promise<void> {
    var id = 10
    this.httpService.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/arbresremarquablesparis2011/records?limit=100') // Maximum limit is 100
      .pipe(
          map((response) => response.data),
          tap((trees: TreeFromAPI[]) => {
            trees.forEach((tree) => this.addTreeFromApi(tree, id),id += 10);
          }),
          map(() => undefined),
      )
    return firstValueFrom(
      this.httpService.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/arbresremarquablesparis2011/records?limit=100&offset=100') // Maximum limit is 100
      .pipe(
        map((response) => response.data),
        tap((trees: TreeFromAPI[]) => {
          trees.forEach((tree) => this.addTreeFromApi(tree, id),id += 10);
        }),
        map(() => undefined),
      ),
    );
  }

  /**
   * Adds a tree from the online API 
   * @param tree data obtained from the API 
   * @param id id to asign to this new tree
   */
  private addTreeFromApi(tree: TreeFromAPI, id: number) {
    this.addTree(new Tree(id,
      tree.arbres_libellefrancais, tree.com_nom_usuel, tree.com_nom_latin,
      tree.arbres_hauteurenm, tree.arbres_circonferenceencm,
      tree.arbres_stadedeveloppement, tree.com_annee_plantation,
      tree.com_qualification_rem, tree.com_resume, tree.com_descriptif,
      tree.arbres_genre, tree.arbres_espece, tree.arbres_varieteoucultivar,
      tree.com_url_pdf, tree.com_url_photo1,
      tree.geom_x_y.get("lon"), tree.geom_x_y.get("lat"),
      (tree.com_adresse === null || tree.com_adresse === "")? tree.com_adresse: tree.com_site,
      tree.arbres_adresse + "(district " + tree.com_arrondissement + ")"
    ))
  }
}
