import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { records } from 'src/mock/example.mock';
import { toPromise } from '@shared/utils';
import { ExampleDto } from './dto/example.dto';
import { ExampleEntity } from './entity/example.entity';
import { toExampleDto } from './example.mapper';
import { ExampleListDto } from './dto/example.list.dto';
import { ExampleCreateDto } from './dto/example.create.dto';

@Injectable()
export class ExampleService {
  records: ExampleEntity[] = records;

  async getOneExample(id: string): Promise<ExampleDto> {
    const example = this.records.find((record) => record.id === id);

    if (!example) {
      throw new HttpException(
        `Example item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toExampleDto(example));
  }

  async getAllExample(): Promise<ExampleListDto> {
    const records = this.records.map((record) => toExampleDto(record));

    return toPromise({ records });
  }

  async updateExample(id: string, updateData: ExampleDto): Promise<ExampleDto> {
    const updateExample = this.records.find((record) => record.id === id);
    this.records = this.records.map((record) => {
      if (record.id === updateExample.id) {
        return updateData;
      }
      return record;
    });

    return toPromise(toExampleDto(updateData));
  }

  async destroyExample(id: string): Promise<ExampleDto> {
    const destroyExample = this.records.find((record) => record.id === id);
    this.records = this.records.filter(
      (record) => record.id === destroyExample.id,
    );
    return toPromise(toExampleDto(destroyExample));
  }

  async createExample(exampleDto: ExampleCreateDto): Promise<ExampleDto> {
    const { name, description } = exampleDto;

    const example: ExampleEntity = {
      id: randomUUID(),
      name,
      description,
    };

    this.records.push(example);
    return toPromise(toExampleDto(example));
  }
}
