import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';
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
     * TREE NAMES
     */

    @IsString()
    @IsNotEmpty()
    name: string; // General name (example: oak)

    @IsString()
    commonName: string; // Precise name (example: white oak)

    @IsString()
    botanicName: string; // Latin name of the tree (search examples on internet if you don't understand this)

    /**
     * TREE INFORMATION
     */

    @IsInt()
    @Min(0, {message:'Height must be positive'})
    @Max(150, {message:'Maximum height is 150 meters'})
    height: number; // Tree height in meters

    @IsInt()
    @Min(0, {message:'Circumference must be positive'})
    @Max(5000, {message:'Maximum circumference is 5000 cm'})
    circumference: number; // Tree circumference in centimeters (at the base of the tree)

    /**
     * TREE AGE
     */

    @IsString()
    @IsIn(['M','A','J'], {message:'DevelopmentStage must be "M", "A" or "J"'})
    developmentStage: string; // Development stage of the tree

    @IsInt()
    @Min(1800)
    @Max(2025)
    plantationYear: number; // Year of plantation of the tree (not always known)

    /**
     * TREE DESCRIPTIONS
     */

    @IsString()
    @IsIn(["Paysager", "Historique", "Botanique", "Symbolique"])
    outstandingQualification: string; // Reason why the tree is here (example: historical)

    @IsString()
    summary: string; // Summary of the description below

    @IsString()
    description: string; // Description of the tree

    /**
     * CLASSIFICATION OF THE TREE
     */

    @IsString()
    type: string; // Scientific type of the tree (example: "Cedrus")

    @IsString()
    species: string; // Scientific species of the tree (example: "atlantica")

    @IsString()
    variety: string; // Variety of the tree when needed

    /**
     * PICTURES
     */

    @IsUrl()
    sign: string; // Url of the sign of the tree

    @IsUrl()
    picture: string; // Url of a picture of the tree


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
    address: string; // com_adresse || arbres_adresse (if com_adresse null)
    // "Carrefour de Longchamp" "GRANDE CASCADE - CARREFOUR DE LONGCHAMP"

    @IsString()
    addressBis: string; // Other address


    /**
     * Full constructor
     * @param id id of the tree
     * @param name general name of the tree (example: Oak)
     * @param commonName precise name (example: white oak)
     * @param botanicName botanic (latin) name
     * @param height height of the tree in meters
     * @param circumference circumference of the trunk in centimeters
     * @param developmentStage development stage of the tree ("M", "A" or "J")
     * @param plantationYear year of plantation of the tree
     * @param outstandingQualification reason why this tree is here ("Paysager", "Historique", "Botanique", "Symbolique")
     * @param summary summary of the description
     * @param description description of the tree
     * @param type type of tree
     * @param species species of the tree
     * @param variety variatety of the tree
     * @param sign url to the picture of the sign of this tree
     * @param picture url to the picture of this tree
     * @param longitude longitude coordinate of this tree
     * @param latitude latitude coordinate of this tree
     * @param address address of the tree
     * @param addressBis other address of the tree
     */
    constructor(id: number, name: string, commonName: string, botanicName: string, height: number, circumference: number, 
      developmentStage: string, plantationYear: number | string, outstandingQualification: string, summary: string, description: string,
      type: string, species: string, variety: string, sign: string, picture: string,
      longitude: number, latitude: number, address: string, addressBis = "") {
        this.id = id;
        this.name = name;
        this.commonName = commonName;
        this.botanicName = botanicName;
        this.height = height;
        this.circumference = circumference;
        this.developmentStage = developmentStage;
        if(typeof plantationYear === "number") this.plantationYear = plantationYear;
          else if(!Number.isNaN(Number(plantationYear))) this.plantationYear = Number(plantationYear)
        this.outstandingQualification = outstandingQualification;
        this.summary = summary;
        this.description = description;
        this.type = type;
        this.species = species;
        this.variety = variety;
        this.sign = sign;
        this.picture = picture;
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;
        this.addressBis = addressBis;
    }
}

export const compareWithName = (a: Tree, b: Tree): number => {
  return a.name.localeCompare(b.name);
};

