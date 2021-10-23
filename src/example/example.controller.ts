import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { toPromise } from '@shared/utils';
import { ExampleCreateDto } from './dto/example.create.dto';
import { ExampleListDto } from './dto/example.list.dto';
import { ExampleDto } from './dto/example.dto';
import { ExampleService } from './example.service';
import { DeleteResult } from 'typeorm';
import { ExampleUpdateDto } from './dto/example.update.dto';

@Controller('api/v1/examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  async findAll(): Promise<ExampleListDto> {
    const records = await this.exampleService.getAllExample();
    return toPromise(records);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ExampleDto> {
    return this.exampleService.getOneExample(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() todoCreateDto: ExampleCreateDto): Promise<ExampleDto> {
    return this.exampleService.createExample(todoCreateDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() exampleDto: ExampleUpdateDto,
  ): Promise<ExampleDto> {
    return this.exampleService.updateExample(id, exampleDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<DeleteResult> {
    return this.exampleService.destroyExample(id);
  }
}
