import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { toPromise } from '@shared/utils';
import { ExampleDto } from './dto/example.dto';
import { ExampleEntity } from './entity/example.entity';
import { toExampleDto } from './example.mapper';
import { ExampleListDto } from './dto/example.list.dto';
import { ExampleCreateDto } from './dto/example.create.dto';
import { ExampleUpdateDto } from './dto/example.update.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(ExampleEntity)
    private readonly exampleRepo: Repository<ExampleEntity>,
  ) {}

  async getOneExample(id: string): Promise<ExampleDto> {
    const example = await this.exampleRepo.findOne({
      where: { id },
    });

    if (!example) {
      throw new HttpException(
        `Todo list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toExampleDto(example);
  }

  async getAllExample(): Promise<ExampleListDto> {
    const records = await this.exampleRepo.find();

    return toPromise({
      records: records.map((record) => toExampleDto(record)),
    });
  }

  async updateExample(
    id: string,
    updateData: ExampleUpdateDto,
  ): Promise<ExampleDto> {
    const example = await this.exampleRepo.findOne({ where: { id } });

    return toExampleDto(
      await this.exampleRepo.save({ ...example, ...updateData }),
    );
  }

  async destroyExample(id: string): Promise<DeleteResult> {
    return this.exampleRepo.delete({ id });
  }

  async createExample(exampleDto: ExampleCreateDto): Promise<ExampleDto> {
    const { name, description } = exampleDto;

    const example: ExampleEntity = this.exampleRepo.create({
      name,
      description,
    });

    await this.exampleRepo.save(example);
    return toPromise(toExampleDto(example));
  }
}
