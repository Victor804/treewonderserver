import { IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
// help :  https://dev.to/sarathsantoshdamaraju/nestjs-and-class-validator-cheat-sheet-13ao

/**
 * NOT FINISHED YET
 */
export class Tree {
    /**
     * ID of the tree
     */
    @IsNotEmpty({message:'ID cannot be empty'})
    @IsInt()
    @Min(0)
    id: number;

    /**
     * TREE
     */
    frenchName: string; // arbres_libellefrancais | "C\u00e8dre"       "Marronnier"
    commonName: string; // com_nom_usuel | "C\u00e8dre du Liban"    "Marronnier d'Inde"
    botanicName: string; // com_nom_latin | "Cedrus libani"       "Aesculus hippocastanum"
    height: number; // arbres_hauteurenm | 25.0     22.0
    circumference: number; // arbres_circonferenceencm | 468.0      350.0
    @IsString()
    @IsIn(['M','A','J'])
    developmentStage: string; // arbres_stadedeveloppement
    pepiniere: string; // arbres_pepiniere | "Inconnue" -> qq connus
    type: string; // arbres_genre | "Cedrus"   "Aesculus"
    species: string; // arbres_espece | "atlantica"      "hippocastanum"
    variety: string; // arbres_varieteoucultivar | qq non nuls
    @IsNumber()
    plantationYear: number; // com_annee_plantation | "1862"     "Inconnue"
    @IsDateString()
    plantationDate: string; // arbres_dateplantation | "1862-01-01T00:09:21+00:00"      "1700-01-01T00:09:21+00:00"
    taxonomicAuthority: string; // com_autorite_taxo | "A.Rich."    "L."
    outstandingQualification: string; // com_qualification_rem | "Paysager"   "Historique"  "Botanique"  "Symbolique"
    summary: string; // com_resume | "Cet arbre est class\u00e9 remarquable pour son ampleur et son empreinte dans le paysage."
    description: string; // com_descriptif
    sign: string; // com_url_pdf | "https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/PDF/2002348.pdf"
    picture: string; // com_url_photo1 | "https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/Photos2023/1/2002348.jpg"


    /**
     * LOCALISATION
     */
    
    // Geographic coordinates
    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;  // "geom_x_y": {"lon": 2.2404811309796573, "lat": 48.86339073126113}
    @IsNumber()
    @Min(0)
    @Max(90)
    latitude: number;   // "geom_x_y": {"lon": 2.2404811309796573, "lat": 48.86339073126113}

    // Address
    city: string;   // Paris

    site: string; // com_site: string | "Bois de Boulogne. Grande Cascade"     "Cimeti\u00e8re du P\u00e8re Lachaise"

    arrondissement: number; // com_arrondissement | "16"       "20"
    arrondissementBis: string; // arbres_arrondissement | "BOIS DE BOULOGNE"  "PARIS 20E ARRDT"

    address: string; // arbres_adresse | "GRANDE CASCADE - CARREFOUR DE LONGCHAMP"   "CIMETIERE DU PERE LACHAISE / DIV 76"
    addressBis: string; // com_adresse | "Carrefour de Longchamp"     "Cimetiere Du Pere Lachaise / Div 76"
    
    addressComplement: string; // arbre_complement_adresse | "16-09"
    addressComplementBis: string; // com_complement_adresse | "16-09"  ->   3 différents

    domanialite: string; // arbres_domanialite | "Jardin"  "CIMETIERE"
    domanialiteBis: string; // com_domanialite | "Bois de Boulogne"       "Cimeti\u00e8re"


    /**
     * OTHERS 
     */

    numDelib: string;  // com_delib_num  (Numéro de délibération)  -> bcp de non null
    dateDelib: string; // com_delib_date (Date de la délibération) -> bcp de non null
    treeLabel: string; // com_label_arbres   (Label national)      -> bcp de non null
    copyright: string; // com_copyright1 | "Sonia Yassa / Ville de Paris"      "Mathieu Bedel / Ville de Paris"


  constructor(id: number, commonName: string, botanicName: string) {
    this.id = id;
    this.commonName = commonName;
    this.botanicName = botanicName;
  }
}

export const compareWithTitle = (a: Tree, b: Tree): number => {
  return a.commonName.localeCompare(b.commonName);
};

