
/**
 * Class representing a tree with all the fields and their original names of the original API
 */
export interface TreeFromAPI {
    geom_x_y: Map<string, number>,
    arbres_idbase: number, // 2002348.0 | 147672.0
    arbres_domanialite: string, // "Jardin" | "CIMETIERE"
    arbres_arrondissement: string, // "BOIS DE BOULOGNE" | "PARIS 20E ARRDT"
    arbres_complementadresse: string, // "16-09" | "20-15"
    arbres_numero: null, // null | null
    arbres_adresse: string, // "GRANDE CASCADE - CARREFOUR DE LONGCHAMP" | "CIMETIERE DU PERE LACHAISE / DIV 76"
    arbres_circonferenceencm: number, // 468.0 | 350.0
    arbres_hauteurenm: number, // 25.0 | 22.0
    arbres_stadedeveloppement: string, // "M" | "M"
    arbres_pepiniere: string, // "Inconnue" | "Inconnue"
    arbres_genre: string, // "Cedrus" | "Aesculus"
    arbres_espece: string, // "atlantica" | "hippocastanum"
    arbres_varieteoucultivar: null, // null | null
    arbres_dateplantation: string, // "1862-01-01T00:09:21+00:00" | "1700-01-01T00:09:21+00:00"
    arbres_libellefrancais: string, // "C\u00e8dre" | "Marronnier"
    com_idbase: number, // 2002348.0 | 147672.0
    com_idarbre: number, // 2002428.0 | 147672.0
    com_site: string, // "Bois de Boulogne. Grande Cascade" | "Cimeti\u00e8re du P\u00e8re Lachaise"
    com_adresse: string, // "Carrefour de Longchamp" | "Cimetiere Du Pere Lachaise / Div 76"
    com_complement_adresse: string, // "16-09" | "20-15"
    com_arrondissement: string, // "16" | "20"
    com_domanialite: string, // "Bois de Boulogne" | "Cimeti\u00e8re"
    com_nom_usuel: string, // "C\u00e8dre du Liban" | "Marronnier d'Inde"
    com_nom_latin: string, // "Cedrus libani" | "Aesculus hippocastanum"
    com_autorite_taxo: string, // "A.Rich." | "L."
    com_annee_plantation: string, // "1862" | "Inconnue"
    com_qualification_rem: string, // "Paysager" | "Paysager"
    com_resume: string, // "Cet arbre est class\u00e9 remarquable pour son ampleur et son empreinte dans le paysage." | "Cet arbre est class\u00e9 remarquable pour son ampleur et son empreinte dans le paysage."
    com_descriptif: string, // "Le c\u00e8dre du Liban est une essence originaire du Moyen-Orient appartenant \u00e0 la famille des Pinac\u00e9es. V\u00e9ritable sculpture v\u00e9g\u00e9tale aux grandes branches \u00e9tal\u00e9es, sa ramure remarquable apporte de l\u2019ombre et attire le regard. \u00ab Les c\u00e8dres du Liban sont les reliques des si\u00e8cles et de la nature, les monuments naturels les plus c\u00e9l\u00e8bres de l\u2019univers [\u2026] \u00bb, disait Alphonse de Lamartine." | "Le marronnier est une essence originaire d\u2019Asie Mineure et des Balkans de la famille des Sapindac\u00e9es. Ses branches ma\u00eetresses, naturellement puissantes et arqu\u00e9es, forment une structure en chandelier typique. Cet aspect tr\u00e8s recherch\u00e9 au XIXe si\u00e8cle fut longtemps encourag\u00e9 par la suppression s\u00e9lective de plusieurs branches pour emp\u00eacher leur croissance. Sa forme majestueuse est remarquable et, en mai, ses fleurs blanches rassembl\u00e9es en pyramides \u00e9voquent des flammes."
    com_delib_num: null, // null | null
    com_delib_date: null, // null | null
    com_label_arbres: null, // null | null
    com_url_pdf: string, // "https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/PDF/2002348.pdf" | "https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/PDF/147672.pdf"
    com_url_photo1: string, // "https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/Photos2023/1/2002348.jpg" | "https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/Photos2023/1/147672.jpg"
    com_copyright1: string // "Sonia Yassa / Ville de Paris" | "Mathieu Bedel / Ville de Paris"
}