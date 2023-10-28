import { IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';
// help :  https://dev.to/sarathsantoshdamaraju/nestjs-and-class-validator-cheat-sheet-13ao

/**
 * CLASS REPRESENTING A TREE WITH ALL HIS INFORMATIONS
 */
export class Tree {
    /**
     * ID of the tree
     */
    @IsNotEmpty()
    @IsInt()
    @Min(0, {message:'ID must be positive'})
    id: number;

    /**
     * TREE INFORMATIONS
     */
    @IsString()
    @IsNotEmpty()
    name: string; // arbres_libellefrancais | "C\u00e8dre"       "Marronnier"

    @IsString()
    commonName: string; // com_nom_usuel | "C\u00e8dre du Liban"    "Marronnier d'Inde"

    @IsString()
    botanicName: string; // com_nom_latin | "Cedrus libani"       "Aesculus hippocastanum"

    @IsInt()
    @Min(0, {message:'Height must be positive'})
    @Max(150, {message:'Maximum height is 150 meters'})
    height: number; // arbres_hauteurenm | 25.0     22.0

    @IsInt()
    @Min(0, {message:'Circumference must be positive'})
    @Max(5000, {message:'Maximum circumference is 5000 cm'})
    circumference: number; // arbres_circonferenceencm | 468.0      350.0

    @IsString()
    @IsIn(['M','A','J'], {message:'DevelopmentStage must be "M", "A" or "J"'})
    developmentStage: string; // arbres_stadedeveloppement

    @IsInt()
    @Min(1800)
    @Max(2025)
    plantationYear: number; // com_annee_plantation | "1862"     "Inconnue"

    @IsString()
    @IsIn(["Paysager", "Historique", "Botanique", "Symbolique"])
    outstandingQualification: string; // com_qualification_rem | "Paysager"   "Historique"  "Botanique"  "Symbolique"

    @IsString()
    summary: string; // com_resume | "Cet arbre est class\u00e9 remarquable pour son ampleur et son empreinte dans le paysage."

    @IsString()
    description: string; // com_descriptif

    @IsString()
    type: string; // arbres_genre | "Cedrus"   "Aesculus"

    @IsString()
    species: string; // arbres_espece | "atlantica"      "hippocastanum"

    @IsString()
    variety: string; // arbres_varieteoucultivar | 15 non nuls

    @IsString()
    taxonomicAuthority: string; // com_autorite_taxo | "A.Rich."    "L."

    @IsUrl()
    sign: string; // com_url_pdf | "https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/PDF/2002348.pdf"

    @IsUrl()
    picture: string; // com_url_photo1 | "https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/Photos2023/1/2002348.jpg"


    /**
     * Geographic coordinates
     */
    @IsNumber()
    @Min(-180, {message:'Longitude must be between -180 and 180'})
    @Max(180, {message:'Longitude must be between -180 and 180'})
    @IsNotEmpty()
    longitude: number;  // "geom_x_y": {"lon": 2.2404811309796573, "lat": 48.86339073126113}

    @IsNumber()
    @Min(0, {message:'Latitude must be between 0 and 90'})
    @Max(90, {message:'Latitude must be between 0 and 90'})
    @IsNotEmpty()
    latitude: number;   // "geom_x_y": {"lon": 2.2404811309796573, "lat": 48.86339073126113}

    /**
     * Address
     */
    @IsString()
    city: string;   // Paris (+ arrondissement ?)
    // arrondissement: number; // com_arrondissement | "16"       "20"

    @IsString()
    site: string; // com_site: string | "Bois de Boulogne. Grande Cascade"     "Cimeti\u00e8re du P\u00e8re Lachaise"

    @IsString()
    @IsNotEmpty()
    address: string; // com_adresse || arbres_adresse (if com_adresse null)
    // "Carrefour de Longchamp" "GRANDE CASCADE - CARREFOUR DE LONGCHAMP"

    @IsString()
    domanialite: string; // com_domanialite


    /**
     * OTHERS 
     */
    @IsString()
    numDelib: string;  // com_delib_num  (Numéro de délibération)  -> 16 non null

    @IsString()
    dateDelib: string; // com_delib_date (Date de la délibération) -> 16 non null

    @IsString()
    copyright: string; // com_copyright1 | "Sonia Yassa / Ville de Paris"      "Mathieu Bedel / Ville de Paris"


    constructor(id: number, name: string, commonName: string, botanicName: string, height: number, circumference: number, 
      developmentStage: string, plantationYear: number, outstandingQualification: string, summary: string, description: string,
      type: string, species: string, variety: string, taxonomicAuthority: string, sign: string, picture: string,
      longitude: number, latitude: number, city: string, site: string, address: string, domanialite: string,
      numDelib: string, dateDelib: string, copyright: string) {
        this.id = id;
        this.name = name;
        this.commonName = commonName;
        this.botanicName = botanicName;
        this.height = height;
        this.circumference = circumference;
        this.developmentStage = developmentStage;
        this.plantationYear = plantationYear;
        this.outstandingQualification = outstandingQualification;
        this.summary = summary;
        this.description = description;
        this.type = type;
        this.species = species;
        this.variety = variety;
        this.taxonomicAuthority = taxonomicAuthority;
        this.sign = sign;
        this.picture = picture;
        this.longitude = longitude;
        this.latitude = latitude;
        this.city = city;
        this.site = site;
        this.address = address;
        this.domanialite = domanialite;
        this.numDelib = numDelib;
        this.dateDelib = dateDelib;
        this.copyright = copyright;
    }
}

export const compareWithTitle = (a: Tree, b: Tree): number => {
  return a.name.localeCompare(b.name);
};

