import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import supertest from 'supertest';
import { TreeModule } from '../src/tree.module';

describe('Tree API', () => {
  let app: INestApplication;
  let httpRequester: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TreeModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    httpRequester = request(app.getHttpServer());
  });

  describe('GET /trees', () => {
    it('Should return a list of all the trees', async () => {
      const response = await request(app.getHttpServer()).get('/trees').expect(200)
      expect(response.body).toEqual(expect.any(Array))
      expect(response.body.length).toBeGreaterThan(190);
    });
  })

  describe('GET /trees/:id', () => {
    it('Should return a single tree matching the input :id', async () => {
      const response = await request(app.getHttpServer()).get('/trees/1800').expect(200)
      expect(response.body.id).toEqual(1800)
      expect(response.body).toEqual({
        id: 1800,
        name: 'Pin',
        commonName: 'Pin Napoléon',
        botanicName: 'Pinus bungeana',
        height: 16,
        circumference: 90,
        developmentStage: 'A',
        outstandingQualification: 'Botanique',
        summary: 'Cet arbre est classé remarquable pour son ampleur et son empreinte dans le paysage.',
        description: "Les pins appartiennent à la famille des Pinacées. Parmi les 111 espèces de pins connues, le pin Napoléon est l'une des plus belles. Ses aiguilles vert-foncé sont courtes et luisantes ; elles contrastent avec son écorce argentée. L'espèce vit très longtemps. Ce pin Napoléon, baptisé « aux neuf dragons » en raison de son tronc divisé en 9 branches, est âgé de 900 ans. Les spécimens les plus connus sont ceux de la cité interdite de Pékin.",
        type: 'Pinus',
        species: 'bungeana',
        variety: null,
        sign: 'https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/PDF/2002380.pdf',
        picture: 'https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/Photos2023/1/2002380.jpg',
        longitude: 2.455366695880772,
        latitude: 48.821320629239985,
        address: 'Bois de Vincennes. Arboretum de Paris',
        addressBis: 'ARBORETUM DE L ECOLE DU BREUIL - ROUTE DE LA FERME / ROUTE DE LA PYRAMIDE(district 12)'
      })
    });
  })

  describe('POST /trees', () => {
    it('Should create the tree and return it', async () => {
      const response = await httpRequester.post('/trees').send({
        id : 5,
        name : "arbreTest",
        commonName: "",
        botanicName: "",
        height: 8,
        circumference: 10,
        plantationYear: 1889, 
        outstandingQualification: "",
        summary: "resume",
        description: "blablabla",
        type: "",
        species: "",
        variety: "",
        longitude: 1,
        latitude: 17,
        address: "",
        addressBis: "",
      }).expect(201);
    });
    it('Should return 400 if content is invalid', async () => {
      const response = await httpRequester.post('/trees').send({
        id : 8,
        name : "arbreTest",
        commonName: "",
        botanicName: "",
        height: 8,
        circumference: 10,
        plantationYear: 2032, // Invalid line (impossible date)
        outstandingQualification: "",
        summary: "resume",
        description: "blablabla",
        type: "",
        species: "",
        variety: "",
        longitude: 1,
        latitude: 17,
        address: "",
        addressBis: "",
      }).expect(400);
    });
  })

  describe('DELETE /trees/:id', () => {
    it('Should delete the tree matching the input id', async () => {
      // Delete the tree
      const response = await request(app.getHttpServer()).delete('/trees/1700').expect(200)

      // Check if the tree was successfully deleted
      const response1 = await httpRequester.get('/trees/1700').expect(200);
      expect(response1.body).toEqual({})
      const response2 = await httpRequester.get('/trees').expect(200);
      expect(response2.body).not.toContainEqual({
        id: 1700,
        name: 'Hêtre',
        commonName: 'Hêtres pleureurs',
        botanicName: "Fagus sylvatica 'Pendula'",
        height: 11,
        circumference: 140,
        developmentStage: 'A',
        plantationYear: 1973,
        outstandingQualification: 'Paysager',
        summary: 'Ces arbres sont classés remarquable pour leur ampleur et leur empreinte dans le paysage.',
        description: 'Essence typique de la famille des Fagacées, le hêtre est la deuxième essence de feuillus des forêts françaises après le chêne. Ces hêtres pleureurs confèrent au lieu un caractère romantique et procurent de l’ombre aux promeneurs.',
        type: 'Fagus',
        species: 'sylvatica',
        variety: "''Pendula''",
        sign: 'https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/PDF/128373.pdf',
        picture: 'https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/Photos2023/1/128373.jpg',
        longitude: 2.2902094870860523,
        latitude: 48.83634112301205,
        address: null,
        addressBis: 'SQUARE DU CLOS FEUQUIERES(district 15)'
      })
    });
  })

  describe('GET /trees/search/:term', () => {
    it('Should return a list of all the trees containing the string :term in one of their parameter', async () => {
      const response = await request(app.getHttpServer()).get('/trees/search/Marron').expect(200)
      expect(response.body).toEqual(expect.any(Array));
      expect(response.body.length).toBeGreaterThan(8);
      expect(response.body).toContainEqual({
        id: 70,
        name: 'Marronnier',commonName: "Marronnier d'Inde",botanicName: 'Aesculus hippocastanum',
        height: 22,circumference: 350,
        developmentStage: 'M',outstandingQualification: 'Paysager',
        summary: 'Cet arbre est classé remarquable pour son ampleur et son empreinte dans le paysage.',
        description: 'Le marronnier est une essence originaire d’Asie Mineure et des Balkans de la famille des Sapindacées. Ses branches maîtresses, naturellement puissantes et arquées, forment une structure en chandelier typique. Cet aspect très recherché au XIXe siècle fut longtemps encouragé par la suppression sélective de plusieurs branches pour empêcher leur croissance. Sa forme majestueuse est remarquable et, en mai, ses fleurs blanches rassemblées en pyramides évoquent des flammes.',
        type: 'Aesculus',species: 'hippocastanum',variety: null,
        sign: 'https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/PDF/147672.pdf',
        picture: 'https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/Photos2023/1/147672.jpg',
        longitude: 2.399983132227271,latitude: 48.85974252900818,
        address: 'Cimetière du Père Lachaise',addressBis: 'CIMETIERE DU PERE LACHAISE / DIV 76(district 20)'
      });
      expect(response.body).toContainEqual({
        id: 690,
        name: 'Marronnier',commonName: "Marronniers d'Inde",botanicName: 'Aesculus hippocastanum',
        height: 22,circumference: 330,
        developmentStage: 'M',outstandingQualification: 'Paysager',
        summary: 'Cet arbre est classé remarquable pour son ampleur et son empreinte dans le paysage.',
        description: "Originaire d’Asie Mineure et des Balkans, le marronnier appartient à la famille des Sapindacées. Son nom scientifique est issu du grec « hippo », cheval, et « kastanon », châtaigne. Les marrons étaient donnés à manger aux équidés.L’histoire des Buttes-Chaumont est, elle aussi, liée aux chevaux. Cette ancienne carrière est devenue, au début du XIXe siècle, un cimetière équin. C'est à partir de 1864 que débutent les travaux d'aménagement du parc que l'on connait aujourd'hui.",
        type: 'Aesculus',species: 'hippocastanum',variety: null,
        sign: 'https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/PDF/102027.pdf',
        picture: 'https://capgeo.sig.paris.fr/PdfEtImages/ArbresRemarquables/Photos2023/1/102027.jpg',
        longitude: 2.385709503891203,latitude: 48.88007971973175,
        address: null,addressBis: 'PARC DES BUTTES CHAUMONT(district 19)'
      });
    })
  })


});