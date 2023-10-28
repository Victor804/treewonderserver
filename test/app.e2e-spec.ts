import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { TreeModule } from '../src/tree.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpRequester: supertest.SuperTest<supertest.Test>;
  /**
   * START
   */
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TreeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    httpRequester = request(app.getHttpServer());
  });

  /**
   * GET ALL BOOKS
   */
  it('/GET all books', async () => {
    const reponse = await request(app.getHttpServer()).get('/').expect(200)
    expect(reponse.body).toEqual(expect.any(Array))
  });


  
});
