import { toPromise } from '@shared/utils';
import { Repository } from 'typeorm';
import { ExampleListDto } from '../dto/example.list.dto';
import { ExampleEntity } from '../entity/example.entity';
import { ExampleController } from '../example.controller';
import { ExampleService } from '../example.service';

describe('CatsController', () => {
  let exampleController: ExampleController;
  let exampleService: ExampleService;

  beforeEach(() => {
    const exampleRepo: Repository<ExampleEntity> = new Repository();
    exampleService = new ExampleService(exampleRepo);
    exampleController = new ExampleController(exampleService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: ExampleListDto = {
        records: [
          {
            id: '1',
            name: 'name test',
            description: 'description test',
          },
        ],
      };

      jest
        .spyOn(exampleService, 'getAllExample')
        .mockImplementation(() => toPromise(result));

      expect(await exampleController.findAll()).toBe(result);
    });
  });
});
