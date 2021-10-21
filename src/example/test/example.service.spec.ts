import { HttpException } from '@nestjs/common';
import { toPromise } from '@shared/utils';
import { toExampleDto } from 'dist/example/example.mapper';
import { Repository } from 'typeorm';
import { ExampleEntity } from '../entity/example.entity';
import { ExampleService } from '../example.service';

describe('CatsController', () => {
  let exampleService: ExampleService;

  describe('getOneExample', () => {
    const result: ExampleEntity = {
      id: '1',
      name: 'name test',
      description: 'description test',
    };

    beforeAll(() => {
      const exampleRepo: Repository<ExampleEntity> = new Repository();

      jest.spyOn(exampleRepo, 'findOne').mockImplementation((params: any) => {
        if (params?.where?.id === result.id) return toPromise(result);
      });

      exampleService = new ExampleService(exampleRepo);
    });

    it('should return a determine example', async () => {
      expect(await exampleService.getOneExample('1')).toEqual(result);
    });

    it('should raise expection when example not exists', async () => {
      try {
        await exampleService.getOneExample('2');
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('getAllExample', () => {
    const result: ExampleEntity[] = [
      {
        id: '1',
        name: 'name test',
        description: 'description test',
      },
    ];

    beforeAll(() => {
      const exampleRepo: Repository<ExampleEntity> = new Repository();

      jest
        .spyOn(exampleRepo, 'find')
        .mockImplementation(() => toPromise(result));

      exampleService = new ExampleService(exampleRepo);
    });

    it('should return an array of example', async () => {
      expect(await exampleService.getAllExample()).toEqual({ records: result });
    });
  });

  describe('updateExample', () => {
    const result: ExampleEntity = {
      id: '1',
      name: 'name test',
      description: 'description test',
    };
    const updatedData = {
      name: 'updated name test',
      description: 'updated description test',
    };

    beforeAll(() => {
      const exampleRepo: Repository<ExampleEntity> = new Repository();

      jest.spyOn(exampleRepo, 'findOne').mockImplementation((params: any) => {
        if (params?.where?.id === result.id) return toPromise(result);
      });

      jest
        .spyOn(exampleRepo, 'save')
        .mockImplementation((data: any) => toPromise(data));

      exampleService = new ExampleService(exampleRepo);
    });

    it('should return updated example', async () => {
      expect(await exampleService.updateExample('1', updatedData)).toEqual({
        ...result,
        ...updatedData,
      });
    });
  });

  describe('deleteExample', () => {
    beforeAll(() => {
      const exampleRepo: Repository<ExampleEntity> = new Repository();

      jest.spyOn(exampleRepo, 'delete').mockImplementation((params: any) => {
        if (params?.id === '1') return toPromise({ success: true } as any);
      });

      exampleService = new ExampleService(exampleRepo);
    });

    it('should return success true message', async () => {
      expect(await exampleService.destroyExample('1')).toEqual({
        success: true,
      });
    });
  });

  describe('createExample', () => {
    const createData: ExampleEntity = {
      id: '1',
      name: 'test',
      description: 'test',
    };

    beforeAll(() => {
      const exampleRepo: Repository<ExampleEntity> = new Repository();

      jest
        .spyOn(exampleRepo, 'create')
        .mockImplementation((data: any) => ({ ...createData, ...data } as any));

      jest
        .spyOn(exampleRepo, 'save')
        .mockImplementation((data: any) => toPromise(data) as any);

      exampleService = new ExampleService(exampleRepo);
    });

    it('should return success true message', async () => {
      expect(await exampleService.createExample(createData)).toEqual(
        toExampleDto(createData),
      );
    });
  });
});
