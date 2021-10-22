import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { clearDb, closeDbConnection } from '@shared/db/connection';
import { AppTestModule } from '@src/app.module';

describe('ExampleController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await clearDb();
    await closeDbConnection();
    await app.close();
  });

  describe('/examples (GET)', () => {
    it('should return empty records when do not have any data', () => {
      return request(app.getHttpServer())
        .get('/api/v1/examples')
        .expect(200)
        .expect({ records: [] });
    });
  });
});
