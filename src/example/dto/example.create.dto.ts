import { IsNotEmpty, MaxLength } from 'class-validator';

export class ExampleCreateDto {
  @IsNotEmpty()
  name: string;

  @MaxLength(500)
  description?: string;
}
