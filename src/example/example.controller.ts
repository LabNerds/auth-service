import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { toPromise } from 'src/shared/utils';
import { ExampleDto } from './dto/example.dto';
import { ExampleCreateDto } from './dto/example_create.dto';
import { ExampleListDto } from './dto/example_list.dto';
import { ExampleService } from './example.service';

@Controller('api/examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  async findAll(): Promise<ExampleListDto> {
    const records = await this.exampleService.getAllExample();
    return toPromise(records);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ExampleDto> {
    return await this.exampleService.getOneExample(id);
  }

  @Post()
  async create(@Body() todoCreateDto: ExampleCreateDto): Promise<ExampleDto> {
    return await this.exampleService.createExample(todoCreateDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() exampleDto: ExampleDto,
  ): Promise<ExampleDto> {
    return await this.exampleService.updateExample(id, exampleDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<ExampleDto> {
    return await this.exampleService.destroyExample(id);
  }
}
