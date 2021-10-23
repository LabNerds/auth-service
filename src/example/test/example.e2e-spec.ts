import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { factory } from 'typeorm-factories';

import { AppTestModule } from '../../app.module';
import { Example } from '@example/entity/example.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType } from '@shared/utils';
import { toExampleDto } from '@example/example.mapper';

describe('ExampleController (e2e)', () => {
  let app: INestApplication;
  let repository: MockType<Repository<Example>>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get(getRepositoryToken(Example));
  });

  afterAll(() => app.close());

  describe('/examples (GET)', () => {
    describe('with example data is empty', () => {
      it('should return empty records when do not have any data', () => {
        return request(app.getHttpServer())
          .get('/api/v1/examples')
          .expect(200)
          .expect({ records: [] });
      });
    });

    describe('with example data is not empty', () => {
      it('should return example list', async () => {
        const total = 5;
        const examples = await factory(Example).makeMany(total);
        jest.spyOn(repository, 'find').mockReturnValue(examples);

        const res = await request(app.getHttpServer())
          .get('/api/v1/examples')
          .expect(200);

        expect(res.body.records).toHaveLength(total);
      });
    });
  });

  describe('/examples/:id (GET)', () => {
    describe('with example id not exist', () => {
      it('should return not found', () => {
        jest.spyOn(repository, 'findOne').mockReturnValue(undefined);
        return request(app.getHttpServer())
          .get('/api/v1/examples/5')
          .expect(HttpStatus.NOT_FOUND);
      });
    });

    describe('with example id exist', () => {
      it('should return example', async () => {
        const example = await factory(Example).make();
        jest.spyOn(repository, 'findOne').mockReturnValue(example);

        return request(app.getHttpServer())
          .get(`/api/v1/examples/${example.id}`)
          .expect(200)
          .expect(toExampleDto(example));
      });
    });
  });

  describe('/examples (POST)', () => {
    describe('with missing params', () => {
      it('should return bad request', () => {
        return request(app.getHttpServer())
          .post('/api/v1/examples')
          .send({})
          .expect(HttpStatus.BAD_REQUEST);
      });
    });

    describe('with valid params', () => {
      it('should create succesfully', async () => {
        const data = {
          name: 'test',
          description: 'test description',
        };

        const res = await request(app.getHttpServer())
          .post('/api/v1/examples')
          .send(data)
          .expect(201);

        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('description');

        expect(res.body.name).toEqual(data.name);
        expect(res.body.description).toEqual(data.description);
      });
    });
  });

  describe('/examples/:id (PUT)', () => {
    describe('with example id not exist', () => {
      const updateData = {
        description: 'updated description',
      };

      it('should return not found', async () => {
        jest.spyOn(repository, 'findOne').mockReturnValue(undefined);
        return request(app.getHttpServer())
          .put('/api/v1/examples/5')
          .send(updateData)
          .expect(HttpStatus.NOT_FOUND);
      });
    });

    describe('with example id exist', () => {
      let example: Example;
      beforeAll(async () => {
        example = await factory(Example).make();
        jest.spyOn(repository, 'findOne').mockReturnValue(example);
      });

      describe('with invalid data', () => {
        const updateData = {
          description: '',
        };

        it('should return bad request', () => {
          return request(app.getHttpServer())
            .put(`/api/v1/examples/${example.id}`)
            .send(updateData)
            .expect(HttpStatus.BAD_REQUEST);
        });
      });

      describe('with valid data', () => {
        const updateData = {
          description: 'testing description',
        };

        it('should return updated data', async () => {
          const res = await request(app.getHttpServer())
            .put(`/api/v1/examples/${example.id}`)
            .send(updateData)
            .expect(200);

          expect(res.body.description).toEqual(updateData.description);
        });
      });
    });
  });

  describe('/examples/:id (DEL)', () => {
    describe('with example id not exist', () => {
      it('should return affected undefined', async () => {
        const res = await request(app.getHttpServer())
          .delete('/api/v1/examples/5')
          .expect(200);

        expect(res.body.affected).toEqual(undefined);
      });
    });

    describe('with example id exist', () => {
      it('should return affected 1', async () => {
        jest.spyOn(repository, 'delete').mockReturnValue({ affected: 1 });

        const res = await request(app.getHttpServer())
          .delete(`/api/v1/examples/5`)
          .expect(200);

        expect(res.body.affected).toEqual(1);
      });
    });
  });
});
