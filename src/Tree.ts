import { IsDefined, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Max, Min } from 'class-validator';

/**
 * CLASS REPRESENTING A TREE WITH ALL HIS INFORMATIONS
 */
export class Tree {
    
    /**
     * ID of the tree
     */
    @IsOptional()
    @IsInt()
    @IsPositive()
    id: number;

    /**
     * TREE NAMES
     */
    @IsNotEmpty()
    @IsString()
    name: string; // General name (example: oak)

    @IsOptional()
    @IsString()
    commonName: string; // Precise name (example: white oak)

    @IsOptional()
    @IsString()
    botanicName: string; // Latin name of the tree (search examples on internet if you don't understand this)

    /**
     * TREE INFORMATION
     */

    @IsOptional()
    @IsInt()
    @IsPositive()
    @Max(150, {message:'Maximum height is 150 meters'})
    height: number; // Tree height in meters

    @IsOptional()
    @IsInt()
    @IsPositive()
    @Max(5000, {message:'Maximum circumference is 5000 cm'})
    circumference: number; // Tree circumference in centimeters (at the base of the tree)

    /**
     * TREE AGE
     */

    @IsOptional()
    @IsString()
    @IsIn(['M','A','J'], {message:'DevelopmentStage must be "M", "A" or "J"'})
    developmentStage: string; // Development stage of the tree

    @IsOptional()
    @IsInt()
    @Min(1700)
    @Max(2024)
    plantationYear: number; // Year of plantation of the tree (not always known)

    /**
     * TREE DESCRIPTIONS
     */
    @IsOptional()
    @IsString()
    @IsIn(["", "Paysager", "Historique", "Botanique", "Symbolique"])
    outstandingQualification: string; // Reason why the tree is here (example: historical)

    @IsOptional()
    @IsString()
    summary: string; // Summary of the description below

    @IsOptional()
    @IsString()
    description: string; // Description of the tree

    /**
     * CLASSIFICATION OF THE TREE
     */
    @IsOptional()
    @IsString()
    type: string; // Scientific type of the tree (example: "Cedrus")

    @IsOptional()
    @IsString()
    species: string; // Scientific species of the tree (example: "atlantica")

    @IsOptional()
    @IsString()
    variety: string; // Variety of the tree when needed

    /**
     * PICTURES
     */
    @IsOptional()
    @IsUrl()
    sign: string; // Url of the sign of the tree

    @IsOptional()
    @IsUrl()
    picture: string; // Url of a picture of the tree


    /**
     * Geographic coordinates
     */
    @IsDefined()
    @IsNumber()
    @Min(-180, {message:'Longitude must be between -180 and 180'})
    @Max(180, {message:'Longitude must be between -180 and 180'})
    longitude: number;  // Real longitude of the tree

    @IsDefined()
    @IsNumber()
    @Min(0, {message:'Latitude must be between 0 and 90'})
    @Max(90, {message:'Latitude must be between 0 and 90'})
    latitude: number;   // Real latitude of the tree

    /**
     * Address
     */
    @IsOptional()
    @IsString()
    address: string; // Main address

    @IsOptional()
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
      longitude: number, latitude: number, address: string, addressBis: string) {
        this.id = id;
        this.name = name;
        this.commonName = commonName;
        this.botanicName = botanicName;
        this.height = height;
        this.circumference = circumference;
        this.developmentStage = developmentStage;
        if(typeof plantationYear === "number") this.plantationYear = plantationYear;
          // plantationYear is a string in the original API
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
/**
 * Function for tree name alphabetical comparison
 * @param a first tree
 * @param b second tree
 * @returns comparison between name of first tree and name of second tree
 */
export const compareWithName = (a: Tree, b: Tree): number => {
  return a.name.localeCompare(b.name);
};

